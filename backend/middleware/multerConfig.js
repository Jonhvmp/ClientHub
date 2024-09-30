const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Nome do arquivo
  }
});

// Filtro de tipo de arquivo (somente imagens)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpeg', '.jpg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true); // Aceita o arquivo
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos (.jpeg, .jpg, .png)'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamanho de arquivo 5MB
  fileFilter: fileFilter
});

module.exports = upload;
