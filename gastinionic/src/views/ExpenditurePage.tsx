import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { useModalStore } from "@/stores/useModalStore";
import { formatMoney } from "@/utils/formatMoney";
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonPopover, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, ellipsisVertical, trashOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()

    const repoCategories = FactoryRepositoryDomain.getRepository("category")
    const repo = FactoryRepositoryDomain.getRepository("expenditure")
    const expenditures = ref<RecordDomainModel[]>([])
    const categories = ref<CategoryDomainModel[]>([])
    const selectedCategoryFilter = ref(0)
    const isOpenPopover = ref(false)
    const modalStore = useModalStore()
    const {
      chartDataLoaded,
    } = storeToRefs(modalStore)

    const {
      onOpenExpenditure: onOpenModalExpenditure,
      onOpenExpenditureDetails,
      onLoadCharData,
    } = modalStore

    const loadList = async (categoryId?: number) => {
      const list = categoryId ? await repo.filterByCategory(categoryId) : await repo.list({
        page: 1, perPage: 10
      })
      expenditures.value = list
    }

    const onRemoveExpenditure = async (id: number) => {
      await repo.delete(id)
      await loadList()
      onLoadCharData()
    }

    watch(chartDataLoaded, (it) => {
      loadList()
    })

    watch(selectedCategoryFilter, (it) => {
      loadList(it)
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
            <IonButtons slot="end">
              <IonButton
                id="popover-spend-more"
                onClick={() => {
                  isOpenPopover.value = true
                }}
              >
                <IonIcon
                  icon={ellipsisVertical}
                />
              </IonButton>
              <IonPopover
                isOpen={isOpenPopover.value}
                trigger="popover-spend-more"
              >
                <IonContent>
                  <IonSelect
                    label="Filtar por categoria"
                    value={selectedCategoryFilter.value}
                    onIonChange={e => {
                      selectedCategoryFilter.value = e.detail.value
                      isOpenPopover.value = false
                    }}
                  >
                    <IonSelectOption value={0}> Todas </IonSelectOption>
                    {categories.value.map(it => (
                      <IonSelectOption value={it.id}>{it.title}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonContent>
              </IonPopover>
            </IonButtons>

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
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
})
