import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ProductRegistration = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product_images')
        .upload(`public/${imageFile.name}`, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('product_images')
        .getPublicUrl(uploadData.path);
      
      const imageUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase.from('products').insert([
        {
          title,
          description,
          price: parseFloat(price),
          category,
          image_url: imageUrl,
          status: 'ativo',
        },
      ]);

      if (dbError) throw dbError;

      alert('Produto cadastrado com sucesso!');
      navigate('/products');
      
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="input-group">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="price">Valor</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="category">Categoria</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="image">Imagem do Produto</label>
          <input type="file" id="image" accept="image/*" onChange={handleFileChange} required />
        </div>
        <div className="button-group">
          <button type="submit">Salvar e Publicar</button>
          <button type="button" onClick={() => navigate('/products')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductRegistration;