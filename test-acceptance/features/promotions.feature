Feature: Cadastro e manutenção de promoções 
#
#    Restaurantes e administradores poderão cadastrar, remover ou atualizar promoções (cupons), 
#    e usuários (clientes) poderão inserir e remover cupons de seus pedidos.
#
#Scenario: inserção de cupom em pedido bem-sucedida
#Given o usuário "Mileto" está na página de finalização de pedido com o valor total de "R$40,00"
#And o cupom "10OFF" está ativo, possui um valor mínimo de "R$20,00" e um desconto de "0.1"
#And o pedido atual não tem cupons aplicados
#When o usuário "Mileto" tenta inserir o cupom "10OFF" no pedido atual
#Then o cupom "10OFF" é aplicado com sucesso
#And o valor do pedido atual é atualizado para "R$36,00"
#
#Scenario: inserção de cupom em pedido que não atingiu o valor mínimo
#Given o usuário "Tales" está na página de finalização de pedido com o valor total de "R$10,00"
#And o cupom "10OFF" está ativo, possui um valor mínimo de "R$20,00" e um desconto de "0.1"
#When o usuário "Tales" tenta inserir o cupom "10OFF" no pedido atual
#Then o cupom "10OFF" é recusado
#And uma mensagem de erro é exibida indicando que o valor do pedido atual não atingiu o mínimo para aplicação do cupom "10OFF"
#And o valor do pedido atual se mantém "R$10,00"
#
#Scenario: inserção de cupom inativo em um pedido
#Given o usuário "Pedro" está na página de finalização de pedido com o valor total de "R$100,00"
#And o cupom "PIZZAEMDOBRO" está inativo
#When o usuário "Pedro" tenta inserir o cupom "PIZZAEMDOBRO" no pedido atual
#Then o cupom "PIZZAEMDOBRO" é recusado
#And uma mensagem de erro é exibida indicando que o cupom "PIZZAEMDOBRO" se encontra inválido
#And o valor do pedido atual se mantém "R$100,00"
#
#Scenario: inserção de cupom inexistente em um pedido
#Given o usuário "Gabriel" está na página de finalização de pedido com o valor total de "R$100,00"
#And o cupom "PIZZA20" não está cadastrado
#When o usuário "Gabriel" tenta inserir o cupom "PIZZA20" no pedido atual
#Then o cupom "PIZZA20" é recusado
#And uma mensagem de erro é exibida indicando que o cupom "PIZZA20" não existe
#And o valor do pedido atual se mantém "R$100,00"
#
#Scenario: inserção de cupom de primeira compra já utilizado
#Given o usuário "Mileto" está na página de finalização de pedido com o valor total de "R$40,00"
#And o usuário "Mileto" já utilizou o cupom "PRIMEIRACOMPRA"
#And o pedido atual não tem cupons aplicados
#When o usuário "Mileto" tenta inserir o cupom "PRIMEIRACOMPRA" no pedido atual
#Then o cupom "PRIMEIRACOMPRA" é recusado
#And uma mensagem de erro é exibida indicando que o cupom "PRIMEIRACOMPRA" já foi utilizado
#
############################################################################################
#
Scenario: cadastro de cupom bem-sucedido pelo restaurante
Given o "restaurant" "Mequi" está na página de listagem de cupons
When o "restaurant" "Mequi" tenta cadastrar o cupom "2BIGMEQUIPOR1" e um desconto de "0.2" com valor mínimo "20.00", associado ao produto "Big Méqui" com status "Ativo"
Then o cupom "2BIGMEQUIPOR1" "é cadastrado"
Then o cupom "2BIGMEQUIPOR1" "aparece" na página de listagem de cupons

Scenario: atualização de cupom bem sucedida pelo restaurante
Given o "restaurant" "Mequi" está na página de listagem de cupons
Given o cupom "2BIGMEQUIPOR1" "aparece" na página de listagem de cupons
When o "restaurant" "Mequi" tenta atualizar o cupom "2BIGMEQUIPOR1" para ter status "Inativo"
Then o cupom "2BIGMEQUIPOR1" "é atualizado"
Then o cupom "2BIGMEQUIPOR1" aparece com status "Ativo" na página de listagem de cupons

Scenario: remoção de cupom bem sucedida por restaurante
Given o "restaurant" "Mequi" está na página de listagem de cupons
When o "restaurant" "Mequi" tenta excluir o cupom "2BIGMEQUIPOR1"  
Then o cupom "2BIGMEQUIPOR1" "é removido"
Then o cupom "2BIGMEQUIPOR1" "não aparece" na página de listagem de cupons

Scenario: cadastro de cupom malsucedido pelo restaurante
Given o "restaurant" "Mequi" está na página de listagem de cupons
Given o cupom "2CHEDDINHAPOR1" "não aparece" na página de listagem de cupons
When o "restaurant" "Mequi" tenta cadastrar o cupom "2CHEDDINHAPOR1" e um desconto de "1.5" com valor mínimo "20.00", associado ao produto "Cheddar Méquimelt" com status "Inativo"
Then o cupom "2CHEDDINHAPOR1" "não é cadastrado"
Then o cupom "2CHEDDINHAPOR1" "não aparece" na página de listagem de cupons

Scenario: cadastro de cupom bem-sucedido por administrador
Given o "admin" "ceb04ad1" está na página de listagem de cupons
Given o cupom "SEGUNDACOMPRA" "não aparece" na página de listagem de cupons
When o "admin" "ceb04ad1" tenta cadastrar o cupom "SEGUNDACOMPRA" e um desconto de "0.2" com valor mínimo de "30.00" com status "Ativo"
Then o cupom "SEGUNDACOMPRA" "é cadastrado"
Then o cupom "SEGUNDACOMPRA" "aparece" na página de listagem de cupons

Scenario: remoção de cupom bem sucedida por administrador
Given o "admin" "ceb04ad1" está na página de listagem de cupons
When o "admin" "ceb04ad1" tenta excluir o cupom "SEGUNDACOMPRA"  
Then o cupom "SEGUNDACOMPRA" "é removido"
Then o cupom "SEGUNDACOMPRA" "não aparece" na página de listagem de cupons

