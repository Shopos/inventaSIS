import { supabase } from "./supabaseClient"

const BUCKET = "imagenes"

type UploadResult = {
  url: string | null
  path?: string
  error?: string
}

export const supabaseService = {

  async uploadImage(file: File): Promise<UploadResult> {
    try {
      if (!file.type.startsWith("image/")) {
        return { url: null, error: "El archivo no es una imagen válida" }
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const filePath = `productos/${Date.now()}_${fileName}`

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file)

      if (error) {
        return { url: null, error: error.message }
      }

      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath)

      return {
        url: data.publicUrl,
        path: filePath
      }

    } catch (err) {
      return {
        url: null,
        error: err.message || "Error inesperado"
      }
    }
  },

  async deleteImage(path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([path])

      if (error) {
        console.error("Error eliminando imagen:", error.message)
        return false
      }

      return true

    } catch (err) {
      console.error("Error inesperado:", err)
      return false
    }
  }
}