const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const server = express();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT } = process.env;
const constantsConfiguredInEnv = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT;

try {

  if ((!constantsConfiguredInEnv)) {
    throw new Error('Constants must be declared in \'./env\' file');
  }

  // Middleware
  server.use(morgan('tiny'));
  server.use(cors());

  const products = [
    {
      id: "AA41B869-FC6E-284D-9B2B-F55B600ED26A",
      title: "Dining table",
      description: "Maple veneer is a durable material with natural colour and pattern variations which gives each table a unique expression. Maple is an exceedingly strong and durable hardwood with a prominent grain. It darkens beautifully with age acquiring a golden-brown undertone. This table has been tested against our strictest standards for stability, durability and safety to withstand everyday use in your home for years.",
      categoryId: 1,
      price: 569.99,
      img: "https://www.arlberry.com/wp-content/uploads/2014/01/Mia-Marquez-1-744x496.jpg"
    },
    {
      id: "DAA0A9E2-90B4-D5B3-1DD1-ED815ACC4279",
      title: "Dining table",
      description: "The plank look, created with a top layer of oak, enhances the crafted, farmhouse expression. Every table is unique with varying grain patterns and natural color shifts. A robust table ready to entertain. The table has a full plank design that gives it an authentic plank expression with a genuine wood feeling. The plank expression is enhanced by the design on the edges. This table has been tested against our strictest standards for stability, durability and safety to withstand everyday use in your home for years.",
      categoryId: 1,
      price: 699.99,
      img: "https://www.orpago.co.uk/sites/default/files/styles/tablelist/public/ashridge-dining-table-handmade_0.jpg?itok=f7PLzFUL"
    },
    {
      id: "388BD667-9719-EF97-E7A5-B513540FAFE5",
      title: "Dining chair",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 1,
      price: 169.99,
      img: "https://www.wright20.com/items/index/2000/157_1_modern_design_march_2011_sam_maloof_dining_chairs_pair__wright_auction.jpg"
    },
    {
      id: "1562087E-7544-4853-E2CE-2B5F8A1876CA",
      title: "Coffee table",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 1,
      price: 489.99,
      img: "https://ak1.ostkcdn.com/images/products/20969227/Alpine-48-Natural-Live-Edge-Wood-Coffee-Table-Natural-0b1202bc-5ea8-4f11-aa3c-c5f965ee2f67_600.jpg?impolicy=medium"
    },
    {
      id: "2CFB722E-51A2-A442-FBB7-A4658809A146",
      title: "Wooden box",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 3,
      price: 139.99,
      img: "https://images.squarespace-cdn.com/content/v1/58dc0327d1758e873aa78bff/1540219350701-O2IBOST9065ZST5T0430/ke17ZwdGBToddI8pDm48kHH9S2ID7_bpupQnTdrPcoF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0nQwvinDXPV4EYh2MRzm-RRB5rUELEv7EY2n0AZOrEupxpSyqbqKSgmzcCPWV5WMiQ/IMG_7768.jpg"
    },
    {
      id: "BCEE647C-C114-5EA7-F529-17B79089E274",
      title: "Wooden jewelry box",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 3,
      price: 199.99,
      img: "https://i.pinimg.com/originals/da/d3/12/dad31229d9c469eb83973eea3def4690.jpg"
    },
    {
      id: "E61A159D-3E61-3C83-D51F-FE8E39B44098",
      title: "Yarn bowl",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 3,
      price: 89.99,
      img: "https://cdn.shopify.com/s/files/1/0494/4848/5018/products/1_8d0de8a2-8a84-4820-9d98-c7523a16ad6a_1000x1000.jpg?v=1606370592"
    },
    {
      id: "FA5B6421-7719-EA3B-5736-9E7E4E87581B",
      title: "Wooden carved spoon set",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 3,
      price: 99.99,
      img: "https://i.etsystatic.com/17108018/r/il/3867ad/2872706655/il_570xN.2872706655_8o6q.jpg"
    }
  ];

  // GET all
  server.get('/products', (req, res) => {
    res.status(200).json(products);
  });

  // GET one
  server.get('/products/:id', (req, res) => {
    const productId = req.params.id;
 
    try {
      const product = products.find(prdct => prdct.id === productId);

      if (product === undefined) throw ({
        message: 'Product does not exist',
        status: 404
      })

      res.status(200).json(product);
      
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  });

  // POST

  // PUT

  // PATCH

  // DELETE
  
  server.listen(SERVER_PORT, (err) => {
    if (err) (
      console.error('Something went wrong when starting the server')
      )
      
      console.log(`Server is running on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
    });
    
  } catch (err) {
    console.log(err.message);
  };


// 01:28