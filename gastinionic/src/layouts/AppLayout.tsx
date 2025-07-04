import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { ModalCategoryForm } from "@/components/ModalCategoryForm";
import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import { ModalReceiptForm } from "@/components/ModalReceiptForm";
import { IonContent, IonModal } from "@ionic/vue";
import { useModalStore } from "@/stores/useModalStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {

    const modalStore = useModalStore()
    const {
      isOpenReceipt,
      isOpenExpenditure,
      isOpenCategory,
      isOpenCategoryDetails,
      isOpenExpenditureDetails,
      isOpenReceiptDetails,
    } = storeToRefs(modalStore)

    const {
      onCloseReceipt,
      onCloseExpenditure,
      onCloseCategory,
      onCloseCategoryDetails,
      onCloseExpenditureDetails,
      onCloseReceiptDetails,
    } = modalStore
    return () => (
      <>
        <RouterView />
        <IonModal
          isOpen={isOpenExpenditure.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseExpenditure}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={isOpenReceipt.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseReceipt}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={isOpenCategory.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalCategoryForm
              onClose={onCloseCategory}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={!!isOpenCategoryDetails.value}
        >
          <IonContent>
            <ModalCategoryForm
              onClose={onCloseCategoryDetails}
              details={isOpenCategoryDetails.value}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={!!isOpenExpenditureDetails.value}
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseExpenditureDetails}
              details={isOpenExpenditureDetails.value}
            />
          </IonContent>
        </IonModal>


        <IonModal
          isOpen={!!isOpenReceiptDetails.value}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseReceiptDetails}
              details={isOpenReceiptDetails.value}
            />
          </IonContent>
        </IonModal>
      </>
    )
  }
})
