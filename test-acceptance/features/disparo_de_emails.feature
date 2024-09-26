Feature: Disparo de e-mails

    # Scenario 1
    Scenario: Usuário finaliza o pedido com sucesso e retorna à página de perfil.
        Given o usuário mileto está na página de confirmação do pedido 578dbdea
        And mileto finaliza o pedido 578dbdea
        And mileto clica no botão de voltar ao perfil
        Then o sistema vai para a página de perfil do usuário mileto

    # Scenario 2
    Scenario: Usuário finaliza o pedido com sucesso, afirma que não recebeu e-mail, mas logo após resolve voltar à página de perfil.
        Given o usuário mileto está na página de confirmação do pedido 578dbdea
        And mileto finaliza o pedido 578dbdea
        And mileto clica no botão relatando que não recebeu nenhum e-mail
        And mileto muda de idiea e clica no botão de voltar ao perfil
        Then o sistema vai para a página de perfil do usuário mileto

    # Scenario 3
    Scenario: Usuário finaliza o pedido com sucesso, pede para que o e-mail seja enviado, e volta à página de pefil
        Given o usuário mileto está na página de confirmação do pedido 578dbdea
        And mileto finaliza o pedido 578dbdea
        And mileto clica no botão relatando que não recebeu nenhum e-mail
        And mileto clica no botão de re-enviar e-mail com comprovante de pedido
        And mileto clica no botão de voltar ao perfil
        Then o sistema vai para a página de perfil do usuário mileto

    # Scenario 4
    Scenario: Após finalizar o pedido e retornar ao perfil, o usuário quer que o e-mail com comprovante seja reenviado.
        Given o usuário mileto está na página de perfil
        And o usuario mileto entra na página de pedidos passados
        And o usuario mileto clica no ícone de reenviar comprovante de pedido por e-mail
    # Then o usuário é informado de se foi um sucesso ou não o envio do e-mail

    # Scenario 5
    Scenario: Após finalizar o pedido e retornar ao perfil, o usuário quer que o e-mail com comprovante seja reenviado.
        Given o usuário mileto está na página de perfil
        And o usuario mileto entra na página de pedidos passados
        And o usuario mileto clica no ícone de fazer download do comprovante de pedido
# Then o sistema realiza o download do comprovante de pedido.



##### Features/cenários com testes não implementados #####

## (só envolve backend) (api não oferece suporte a isso)
# Scenario: O usuário responde email de comprovante de pedido
#     Given o usuário recebe um email do sistema com o comprovante do pedido “001”
#     And
#     When o usuário “mateuzinho” envia um email respondendo este email
#     Then O sistema envia um e-mail avisando que o endereço de email para o qual ele enviou um email não recebe respostas, e oferece um email de suporte.

# (necessita do backend para simular uma falha)
# Scenario: O usuário termina o pedido mas acontece uma falha com o sistema
#     Given o usuário "mateuzinho" está na página de confirmação do pedido “001”
#     And o usuário "mateuzinho" finaliza o pedido  “001”
#     And o sistema apresenta um erro
#     When o pedido “001” não é completado
#     Then o sistema envia um email avisando que houve um erro na finalização do pedido “001” e que o usuário “mateuzinho” deve tentar novamente mais tarde.

# (faltou tempo para implementar a feature e os testes)
# Scenario: O cliente não completa o pedido totalmente
#     Given o usuário “mateuzinho” está fazendo o pedido “001”
#     And o usuário “mateuzinho” fecha o aplicativo
#     When um certo período de tempo “X” passa sem que ele aceite o pedido “001”
#     Then o sistema envia um email notificando da não finalização do pedido “001”.




