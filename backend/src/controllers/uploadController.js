import cloudinary from '../config/cloudinary.js';

// Upload (multer-storage-cloudinary coloca a URL em req.file.path)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    const imageUrl = req.file.path || req.file.secure_url || req.file.url;
    const publicId = req.file.filename || req.file.public_id || req.file?.metadata?.public_id || null;

    if (!imageUrl) {
      return res.status(500).json({
        message: 'Upload feito, mas não foi possível obter a URL da imagem.'
      });
    }

    return res.json({
      message: 'Imagem carregada com sucesso',
      url: imageUrl,
      imageUrl,
      publicId
    });
  } catch (error) {
    console.error('Erro no uploadImage:', error);
    return res.status(500).json({ message: 'Erro ao enviar imagem', error: error.message });
  }
};

// Delete via Cloudinary (precisa do publicId)
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ message: 'publicId não informado' });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return res.json({ message: 'Imagem deletada com sucesso', result });
  } catch (error) {
    console.error('Erro no deleteImage:', error);
    return res.status(500).json({ message: 'Erro ao deletar imagem', error: error.message });
  }
};
