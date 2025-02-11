
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const uploaderId = formData.get('uploaderId')

    if (!file || !title || !type || !uploaderId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Sanitize filename and generate a unique path
    const sanitizedFileName = (file as File).name.replace(/[^\x00-\x7F]/g, '')
    const fileExt = sanitizedFileName.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    // Upload file to storage
    const { data: storageData, error: uploadError } = await supabase.storage
      .from('learning_materials')
      .upload(filePath, file, {
        contentType: (file as File).type,
        upsert: false
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: uploadError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('learning_materials')
      .getPublicUrl(filePath)

    // Save metadata to the learning_materials table
    const { error: dbError } = await supabase
      .from('learning_materials')
      .insert({
        title: title,
        description: description || null,
        content_url: publicUrl,
        type: type,
        uploaded_by: uploaderId
      })

    if (dbError) {
      console.error('Database insert error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to save material metadata', details: dbError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Learning material uploaded successfully', url: publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
