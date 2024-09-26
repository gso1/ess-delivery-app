import { Router } from 'express';
import { Coupon } from './src/coupon';
import { restaurant } from './src/restaurants';
import { PromotionService } from './src/promotion-service';
import { UserService } from './src/user-service';
import { readFiles, restaurants } from './src/readFiles';
import * as fs from 'fs';
import { Order, Admin } from './src/users';

import EmailService from './src/email-service';
import generateOrderReceipt from '../utils/generate_order_receipt'
import { PaymentMethod } from './src/payment-method';
import { PaymentMethodService } from './src/payment-service';

const routes = Router();

// Inicialização
var adminService: PromotionService = new PromotionService();
var restaurantsService: PromotionService[] = [];
var usersService: UserService = new UserService();
var emailService: EmailService = new EmailService();
var methodsService : PaymentMethodService = new PaymentMethodService();

var admins: Admin[] = [];

// ----------------------------------------------------------------
fs.readFile("admin.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  else {
    admins = JSON.parse(data);
    //console.log(admins);
  }
});
// Lendo dos arquivos
[adminService, usersService, restaurantsService] = readFiles(adminService, usersService, restaurantsService);


function updateRestaurantsFile() {
  fs.writeFile("restaurants-coupons.json", JSON.stringify(restaurants), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Arquivo restaurants-coupons.json atualizado!");
    }
  })
}

// ----------------------------------------------------------------

routes.get('/payment', (req, res) => {
  return res.send('Pagina de pagamento');
});

// ----------------------------------------------------------------

// ROTAS DE ADMIN

routes.get('/admin/:id', function (req, res) {
  const id = req.params.id;
  const admin = admins.find((result) => result.id == id);
  // const coupons = adminService.get();
  console.log(admin);
  if (admin) {
    res.status(201).send(admin);
  } else {
    res.status(404).send({ message: ` Administrador ${id} não foi encontrado` });
  }
});

routes.get('/promotion/admin', (req, res) => {
  const promotions = adminService.get();
  res.status(201).send(JSON.stringify(promotions));
});

routes.get('/promotion/admin/:id', function (req, res) {
  const id = req.params.id;
  const coupon = adminService.getByName(id);
  if (coupon) {
    res.status(201).send(coupon);
  } else {
    res.status(404).send({ message: ` Coupon ${id} could not be found` });
  }
});

routes.post('/promotion/admin', function (req, res) {
  const coupon: Coupon = <Coupon>req.body;
  try {
    const result = adminService.add(coupon);
    if (result) {
      adminService.updateFile("admin-coupons.json");
      console.log(result);
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Cupom não pode ser adicionado" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});

routes.put('/promotion/admin/:name', function (req, res) {
  const name = req.params.name;
  const coupon: Coupon = <Coupon>req.body;
  const result = adminService.update(name, coupon);
  //console.log(result);
  const message = `Coupon ${name} has been updated.`;
  const err = `Coupon ${name} could not be found.`;

  if (result) {
    adminService.updateFile("admin-coupons.json");
    console.log(message);
    res.status(201).send(result);
  } else {
    res.status(404).send({ message: err });
  }

});


routes.delete('/promotion/admin/:name', function (req, res) {
  const name = req.params.name;
  const result = adminService.delete(name);

  const message = `Coupon ${name} has been deleted.`;
  const err = `Coupon ${name} could not be found.`;

  if (result) {
    adminService.updateFile("admin-coupons.json");
    console.log(message);
    res.status(201).send({ message: message });
  } else {
    res.status(404).send({ message: err });
  }
})

// ----------------------------------------------------------------
/// ROTAS DE RESTAURANTES

// Retorna o restaurante pelo nome
routes.get('/restaurant/:restName', (req, res) => {
  const restName = req.params.restName;
  const rest = restaurants.find((e) => e.name == restName);

  const msg = console.log(`Restaurant ${restName} found`);
  const err = `Restaurant ${restName} not found`;
  if (rest) {
    console.log(msg)
    res.status(201).send(rest);
  } else {
    console.log(err);
    res.status(404).send({ message: err });
  }
});

routes.get('/promotion/restaurants', (req, res) => {
  res.send(JSON.stringify(restaurants));
});

// retorna todos os cupons de um restaurante
routes.get('/promotion/restaurants/:rest', (req, res) => {
  const restName = req.params.rest;
  const index = restaurants.findIndex((result) => result.name == restName)
  res.status(201).send(JSON.stringify(restaurants[index].coupons));
});

routes.get('/promotion/restaurants/:rest/:id', function (req, res) {
  const { rest, id } = req.params;
  const coupon = restaurantsService[rest].getByName(id);
  if (coupon) {
    res.status(201).send(coupon);
  } else {
    res.status(404).send({ message: ` Coupon ${id} could not be found` });
  }
});

routes.post('/promotion/restaurants/:rest', function (req, res) {
  const coupon: Coupon = <Coupon>req.body;
  const restName: string = req.params.rest;
  const index = restaurants.findIndex((result) => result.name == restName)
  try {
    const result = restaurantsService[restName].add(coupon);
    console.log(restaurantsService[restName].coupons);

    restaurants[index].coupons = restaurantsService[restName].coupons;

    if (result) {
      updateRestaurantsFile();
      console.log(result);
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Cupom não pode ser adicionado" });
    }

  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});


routes.put('/promotion/restaurants/:rest/:id', function (req, res) {
  const { rest, id } = req.params;
  const coupon: Coupon = <Coupon>req.body;
  const result = restaurantsService[rest].update(id, coupon);
  //console.log(result);
  const index = restaurants.findIndex((result) => result.name == rest)
  restaurants[index].coupons = restaurantsService[rest].coupons;
  const err = `Coupon ${id} could not be found.`;
  const message = `Coupon ${id} has been updated.`;

  if (result) {
    res.status(201).send(restaurants[index].coupons);
    updateRestaurantsFile();
    console.log(message);
  } else {
    if (result == undefined) {
      res.status(404).send({ message: "Valor de desconto inválido" });
    } else {
      res.status(404).send({ message: err });
    }
  }

});

routes.delete('/promotion/restaurants/:rest/:id', function (req, res) {
  const { rest, id } = req.params;
  const result = restaurantsService[rest].delete(id);

  const index = restaurants.findIndex((result) => result.name == rest)
  restaurants[index].coupons = restaurantsService[rest].coupons;

  const err = `Coupon ${id} could not be found.`;
  const message = `Coupon ${id} has been deleted.`;

  if (result) {
    updateRestaurantsFile();
    console.log(message);
    res.status(201).send(restaurants[index].coupons);
  } else {
    res.status(404).send({ message: err });
  }
});

// ----------------------------------------------------------------
/// ROTAS DE USUÁRIOS

// Retorna o usuário pelo ID
routes.get('/users/:id', (req, res) => {
  let id = req.params.id;
  const user = usersService.getUserById(id);

  const msg = `user found ${user.id}`;
  const err = `user not found`;
  if (user) {
    console.log(msg);
    res.status(201).send(user);
  } else {
    console.log(err);
    res.status(404).send({ message: err });
  }
});

// Retorna os pedidos de um usuário
routes.get('/user/:id/orders', function (req, res) {
  // readFiles(adminService, usersService, restaurantsService);
  const userId = req.params.id;
  const index = usersService.getUserIndex(userId);
  console.log(usersService.users[index]);
  var orders = usersService.users[index].orders;
  if (orders) {
    res.status(201).send(orders);
  } else {
    res.status(404).send(orders);
  }
});

// Adiciona cupom ao pedido
routes.post('/user/:id/order', function (req, res) {
  var couponName: string = <string>req.body.couponName; // isso daqui pode mudar, order.coupon pode virar string
  var order: Order = <Order>req.body.order;
  var userId = req.params.id;
  var err;

  // se o cupom é de restaurante

  var coupon: Coupon = restaurantsService[order.restaurant].getByName(couponName);

  if (coupon) {
    applyCoupon();
  } else {
    // se não for, é de adm
    coupon = adminService.getByName(couponName);

    if (coupon) {
      applyCoupon();
    } else {
      res.status(403).send("O cupom não existe");
    }
  }

  function applyCoupon() {
    [order, err] = usersService.applyCouponInOrder(userId, order, coupon);

    if (order.coupon.id == '') {
      console.log(err);
      res.status(403).send(err);
    } else {
      console.log(order);
      res.status(201).send(order);
    }
  }
  // OBS: a gente ta perdendo informação do cupom!
});

// Deletar cupom do pedido do usuário
// routes.delete('/user/:id/order', function (req, res){
//   const userId = req.params.id
//   var couponName: string = <string> req.body.couponName;
//   var order: Order = <Order> req.body.order;

//   var coupon: Coupon = restaurantsService[order.restaurant].getByName(couponName);

//   if (coupon == undefined){
//     coupon = adminService.getByName(couponName);
//   }

//   order.coupon = coupon;
//   order = usersService.removeCoupon(order);

//   const message = `Coupon ${couponName} has been removed.`;
//   const err = "Não deu ein :(";

//   if (order) {
//     res.status(201).send({order, message});
//   } else {
//     res.status(404).send({ err });
//   }
// });

// ADICIONAR UM PEDIDO AO ARRAY DE PEDIDOS DO USUÁRIO
routes.post('/user/:id/orders', function (req, res) {
  var order: Order = <Order>req.body;
  const userId: string = req.params.id;
  const index = usersService.getUserIndex(userId);
  var result = undefined;
  try {
    // if(order.amount >= order.coupon.minValue && order.coupon.status == "Ativo"){
    result = usersService.addOrder(index, order);
    if (result) {
      res.status(201).send(result);
      usersService.updateFile();
      console.log("Pedido foi finalizado com sucesso");
    } else {
      res.status(403).send({ message: "Pedido não foi finalizado" });
    }
    // }else{
    //   result = usersService.removeCoupon(order);
    //   if (result) {
    //     res.status(403).send({ message: "Cupom inválido", result });
    //   }
    // }

  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});

// Envia email
routes.post('/payment/confirm/:userid', async (req, res) => {
  let userid = req.params.userid;
  let order: Order = <Order>req.body;

  try {
    const user = usersService.getUserById(userid);
    //DEBUG: console.log(user);
    if (user) {
      var msg: string = generateOrderReceipt(user, order)


      var info = await emailService.sendMail(
        {
          to: { name: user.name, email: user.email },
          message: { subject: 'Order confirmation', body: msg }
        }
      );
      if (info.accepted) {
        res.status(201).send({ message: '201 Order confirmed', msg });
      }
    } else {
      throw "User not found"
    }
  } catch (err) {
    msg = err;
    res.status(400).send({ msg });
  }
});


//metodos
routes.get('/user/:id/methods', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    console.log(index);
    const methods = usersService.users[index].paymentMethods;
    console.log(methods)
    res.send(JSON.stringify(methods));
  });

//metodo sozinho
  routes.get('/user/:id/metodos/:ident', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const id = req.params.ident;
    const metodo = usersService.users[index].paymentMethods.find(e => e.id == id);
    if (metodo) {
      res.send(metodo);
    } else {
      res.status(404).send({ message: `Method ${id} could not be found`});
    }
  });
  
  routes.post('/user/:id/methods', function(req, res){
    console.log("entrou no poste");
    const userId = req.params.id;
    console.log(usersService.users)
    const index = usersService.getUserIndex(userId);
 
    const newMethod: PaymentMethod = <PaymentMethod> req.body;
    console.log(newMethod);
    
    try {
      console.log("antes result")

      methodsService.set(usersService.users[index].paymentMethods);
      const result = methodsService.add(newMethod);
      console.log("post", usersService.users[index].paymentMethods);
      console.log(result)

      //const result = usersService.users[index].metodos_de_pagamento.add(metodo);
      console.log("resulta aqui:")
      console.log(result);
      if (result) {
        console.log("de bom 201")
        res.status(201).send(result);
      } else {
        res.status(403).send({ message: "Method list is full, method name is already exist or method type is invalid."});
      }
    } catch (err) {
      const {message} = err;
      res.status(400).send({ message })
    }
  });

  
  routes.put('/user/:id/methods/', function(req, res){
    console.log("editar método \n antes:");
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    
    const method: PaymentMethod = <PaymentMethod> req.body;
    
    console.log("antes")
    console.log(method.id)
    console.log(usersService.users[index].paymentMethods)

    methodsService.set(usersService.users[index].paymentMethods)
    const result = methodsService.update(method);
    
    if (result) {
      console.log("depois:")
      console.log(result);
      res.status(201).send(result);
    } else {
      res.status(404).send({ message: `Inconsistents datas.`});
    }
  });
  
  routes.delete('/user/:idUser/methods/:idPay', function(req, res){

    console.log("entroou deleetee")
    const userId = req.params.idUser;
    const methodId = req.params.idPay;
    const index = usersService.getUserIndex(userId);
    console.log(methodId);
    console.log("printando service")
    
    methodsService.set(usersService.users[index].paymentMethods);

    const eraseMethod: PaymentMethod = usersService.users[index].paymentMethods.find( e => e.id == methodId);
    try {
      
      console.log("printando metohd:")
    
      const result = methodsService.remove(eraseMethod);
      
      console.log(usersService.users[index].paymentMethods);
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(403).send({ message: "Method list is void or method does not exist."});
      }
    } catch (err) {
      const {message} = err;
      res.status(400).send({ message })
    }
  });

export default routes;
