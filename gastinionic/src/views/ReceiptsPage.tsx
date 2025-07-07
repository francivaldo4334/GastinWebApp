import { Pagination } from "@/components/Pagination";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { useModalStore } from "@/stores/useModalStore";
import { formatMoney } from "@/utils/formatMoney";
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()

    const repoCategories = FactoryRepositoryDomain.getRepository("category")
    const repo = FactoryRepositoryDomain.getRepository("receipt")
    const categories = ref<CategoryDomainModel[]>([])
    const pagination = reactive({
      items: [] as RecordDomainModel[],
      total: 0,
      currentPage: 1,
      perPage: 20
    })
    const modalStore = useModalStore()
    const {
      chartDataLoaded,
    } = storeToRefs(modalStore)

    const {
      onOpenReceipt,
      onOpenReceiptDetails,
      onLoadCharData,
    } = modalStore

    const loadList = async () => {
      const list = await repo.paginate(pagination.currentPage, pagination.perPage)
      pagination.items = list.results
      pagination.total = list.total
    }

    const onRemoveExpenditure = async (id: number) => {
      await repo.delete(id)
      await loadList()
      onLoadCharData()
    }

    watch(chartDataLoaded, (it) => {
      loadList()
    })

    watch(pagination, () => {
      loadList()
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
              Receitas 
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton
              onClick={onOpenReceipt}
            >
              <IonIcon
                icon={addOutline}
              />
            </IonFabButton>
          </IonFab>
          <IonList>
            {
              pagination.items.map(it => (
                <IonItemSliding>
                  <IonItem
                    button
                    onClick={() => {
                      onOpenReceiptDetails(it)
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
              page={pagination.currentPage}
              countItems={pagination.total}
              perPage={pagination.perPage}
              setPage={(value: number) => {
                pagination.currentPage = value
              }}
            />
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
})
