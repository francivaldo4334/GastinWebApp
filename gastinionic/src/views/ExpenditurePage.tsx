import { Pagination } from "@/components/Pagination";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { useModalStore } from "@/stores/useModalStore";
import { formatMoney } from "@/utils/formatMoney";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()

    const repoCategories = FactoryRepositoryDomain.getRepository("category")
    const repo = FactoryRepositoryDomain.getRepository("expenditure")
    const categories = ref<CategoryDomainModel[]>([])
    const expenditures = ref<RecordDomainModel[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const perPage = 20
    // const pagination = reactive({
    //   items: [] as RecordDomainModel[],
    //   total: 0,
    //   currentPage: 1,
    //   perPage: 20
    // })
    const modalStore = useModalStore()
    const {
      chartDataLoaded,
    } = storeToRefs(modalStore)

    const {
      onOpenExpenditure: onOpenModalExpenditure,
      onOpenExpenditureDetails,
      onLoadCharData,
    } = modalStore

    const loadList = async (page?: number) => {
      const list = await repo.paginate(page ? page : currentPage.value, perPage)
      expenditures.value = list.results
      total.value = list.total
    }

    const onRemoveExpenditure = async (id: number) => {
      await repo.delete(id)
      await loadList()
      onLoadCharData()
    }

    watch(chartDataLoaded, (it) => {
      loadList()
    })

    watch(currentPage, (page) => {
      loadList(page)
    })


    onMounted(async () => {
      loadList()
      const listcategorie = await repoCategories.list()
      categories.value = listcategorie
    })
    const formatDate = (value: string) => {
      const [date, time] = value.split("T")
      const [year, month, day] = date.split("-")
      return `${day}/${month}/${year}`
    }

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
            <IonTitle>
              Despesas
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton
              onClick={onOpenModalExpenditure}
            >
              <IonIcon
                icon={addOutline}
              />
            </IonFabButton>
          </IonFab>
          <IonList>
            {
              expenditures.value.map(it => (
                <IonItemSliding>
                  <IonItem
                    button
                    onClick={() => {
                      onOpenExpenditureDetails(it)
                    }}
                  >
                    <IonLabel>
                      <IonText>
                        {it.description}
                      </IonText>
                      <h5>{it.categoryTitle}</h5>
                      <p>
                        {
                          !it.isRecurrent ?
                            formatDate(it.date!)
                            : it.isEveryDays ?
                              "..."
                              : `${formatDate(it.initValidity!)} - ${formatDate(it.endValidity!)}`
                        }
                      </p>
                    </IonLabel>
                    <IonLabel slot="end">
                      R$ {formatMoney(String(it.value))}
                      <IonIcon
                        icon={chevronBackOutline}
                      />
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions slot="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => onRemoveExpenditure(it.id)}
                    >
                      <IonIcon
                        icon={trashOutline}
                      />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))
            }
            <Pagination
              page={currentPage.value}
              countItems={total.value}
              perPage={perPage}
              setPage={(value: number) => {
                currentPage.value = value
              }}
            />
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
})
