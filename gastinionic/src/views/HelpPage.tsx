import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()
    return () => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {
                route.path !== "/" &&
                <IonBackButton defaultHref="/" />
              }
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <IonList>
            <IonListHeader>
              <IonTitle>Bem-vindo ao aplicativo Gastin!</IonTitle>
            </IonListHeader>

            <IonItem>
              <IonText>
                <p>
                  O Gastin é um aplicativo incrível que foi projetado para ajudar você a registrar e
                  acompanhar seus gastos e ganhos de forma fácil e conveniente. Com ele, você poderá
                  ter um controle financeiro mais eficiente e manter seus saldos sempre atualizados.
                </p>
              </IonText>
            </IonItem>

            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                <h2>1. Registro de Gastos e Ganhos:</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - No Gastin, você pode criar registros para cada uma das suas transações financeiras.
                Para adicionar um novo registro, basta selecionar a opção "Adicionar" ou o ícone de "+" na tela principal.
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - Ao criar um registro, você pode inserir informações relevantes: a categoria (gasto ou ganho),
                o valor e uma descrição opcional.
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - Certifique-se de fornecer todos os detalhes necessários para manter seus registros precisos e úteis.
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                <h2>2. Categorias e Tags:</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - O Gastin oferece a opção de categorizar seus gastos e ganhos. Isso ajuda a organizar suas transações e facilita a visualização e análise posterior.
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - Você pode escolher entre as categorias predefinidas disponíveis ou criar suas próprias categorias personalizadas.
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - Além disso, o uso de tags pode ser útil para identificar e agrupar transações relacionadas. Por exemplo, você pode adicionar uma tag chamada "Viagem" para todas as despesas relacionadas a viagens.
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                <h2>3. Acompanhamento de Saldos:</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - Com base nos registros de gastos e ganhos, o aplicativo calcula automaticamente seu saldo atual.
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - Na tela principal do Gastin, você encontrará seu saldo atual exibido de forma clara.
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-text-wrap">
                - O Gastin também oferece visualização de histórico, gráficos e relatórios para análise de seus gastos e ganhos ao longo do tempo.
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonText>
                <p>
                  O Gastin foi desenvolvido para ser uma ferramenta amigável e intuitiva para ajudá-lo a manter suas finanças em ordem.
                  Explore todas as funcionalidades e personalize-as de acordo com suas necessidades individuais.
                </p>
              </IonText>
            </IonItem>

            <IonItem>
              <IonText>
                <strong>
                  Esperamos que o Gastin torne a gestão financeira mais fácil e eficiente para você.
                  Seja inteligente com suas finanças e aproveite o aplicativo Gastin!
                </strong>
              </IonText>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  },
});
