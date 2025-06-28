import { Box, Heading, Text, VStack, ListItem, UnorderedList, IconButton } from "@hope-ui/solid";
import { Scaffold } from "../ui/Scaffold";
import { Undo } from "lucide-solid";
import { useNavigate } from "@solidjs/router";

export default function HelpPage() {

  const navigate = useNavigate()

  return (
    <Scaffold>
      <Scaffold.AppBar>
        <Scaffold.AppBar.Title>
          <IconButton
            aria-label="Go to back page"
            icon={<Undo />}
            variant="ghost"
            colorScheme="neutral"
            onClick={() => navigate(-1)}
          />
        </Scaffold.AppBar.Title>
      </Scaffold.AppBar>
      <Scaffold.Body>
        <Box p="$6" maxW="$lg" mx="auto">
          <VStack spacing="$4" alignItems="start">
            <Heading size="2xl">Bem-vindo ao aplicativo Gastin!</Heading>

            <Text>
              O Gastin é um aplicativo incrível que foi projetado para ajudar você a registrar e
              acompanhar seus gastos e ganhos de forma fácil e conveniente. Com ele, você poderá ter um
              controle financeiro mais eficiente e manter seus saldos sempre atualizados.
            </Text>

            <Heading size="lg">1. Registro de Gastos e Ganhos:</Heading>
            <UnorderedList pl="$4" spacing="$2">
              <ListItem>
                No Gastin, você pode criar registros para cada uma das suas transações financeiras.
                Para adicionar um novo registro, basta selecionar a opção "Adicionar" ou o ícone de "+" na tela principal.
              </ListItem>
              <ListItem>
                Ao criar um registro, você pode inserir informações relevantes: a categoria (gasto ou ganho), o valor e uma descrição opcional.
              </ListItem>
              <ListItem>
                Certifique-se de fornecer todos os detalhes necessários para manter seus registros precisos e úteis.
              </ListItem>
            </UnorderedList>

            <Heading size="lg">2. Categorias e Tags:</Heading>
            <UnorderedList pl="$4" spacing="$2">
              <ListItem>
                O Gastin oferece a opção de categorizar seus gastos e ganhos. Isso ajuda a organizar
                suas transações e facilita a visualização e análise posterior.
              </ListItem>
              <ListItem>
                Você pode escolher entre as categorias predefinidas disponíveis ou criar suas próprias
                categorias personalizadas.
              </ListItem>
              <ListItem>
                Além disso, o uso de tags pode ser útil para identificar e agrupar transações relacionadas.
                Por exemplo, você pode adicionar uma tag chamada "Viagem" para todas as despesas relacionadas a viagens.
              </ListItem>
            </UnorderedList>

            <Heading size="lg">3. Acompanhamento de Saldos:</Heading>
            <UnorderedList pl="$4" spacing="$2">
              <ListItem>
                Com base nos registros de gastos e ganhos, o aplicativo calcula automaticamente seu saldo atual.
              </ListItem>
              <ListItem>
                Na tela principal do Gastin, você encontrará seu saldo atual exibido de forma clara.
              </ListItem>
              <ListItem>
                O Gastin também oferece visualização de histórico, gráficos e relatórios para análise de seus gastos e ganhos ao longo do tempo.
              </ListItem>
            </UnorderedList>

            <Text>
              O Gastin foi desenvolvido para ser uma ferramenta amigável e intuitiva para ajudá-lo a manter suas finanças em ordem.
              Explore todas as funcionalidades e personalize-as de acordo com suas necessidades individuais.
            </Text>

            <Text fontWeight="$semibold">
              Esperamos que o Gastin torne a gestão financeira mais fácil e eficiente para você.
              Seja inteligente com suas finanças e aproveite o aplicativo Gastin!
            </Text>
          </VStack>
        </Box>
      </Scaffold.Body>
    </Scaffold>
  );
}
