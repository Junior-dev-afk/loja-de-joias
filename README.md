ficticiaStore

ficticiaStore é uma aplicação web para uma loja de joias, desenvolvida com React no frontend e Node.js no backend. 
O projeto tem como objetivo fornecer uma experiência de compra interativa e eficiente, com uma interface de usuário
moderna e uma API robusta para gerenciar produtos e pedidos.

Como iniciar 

    Backend

        1 - entrar na pasta backend
        2 - abrir o terminal na pasta
        3 - digitar o comando " npm start " 

    Frontend

        1 - entrar na pasta frontend
        2 - abrir o terminal na pasta
        3 - digitar o comando " npm run dev "


Tecnologias Utilizadas

    Frontend:
        React
        React Router
        React useEffect
        React useState

    Backend:
        Node.js
        Express
        MongoDB (para armazenamento de dados)

Funcionalidades

    Frontend:
        Navegação por categorias de joias
        Visualização detalhada de produtos

        # Em andamento
        
        Carrinho de compras e checkout
        Autenticação e gestão de usuários (login e registro)

    Endpoints :
    
      /getFotosSugestao
          retorna um lista com objetos cada objeto com seu Nome, Id, Imagem, Descricao e Valor do produto

      /getTiposItens
          retorna uma lista com nome e imagens das categorias

      /getItensHome
          retorno uma lista dos itens destacados na pagina inicial

      /filtrar/:classe/:min/:max
          retorna uma lista com os itens filtrados por categoria preço minimo e preço maximo
