import { defineComponent } from "vue";
import { ModalCategoryForm } from "@/components/ModalCategoryForm";
import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import { ModalReceiptForm } from "@/components/ModalReceiptForm";
import { IonContent, IonModal } from "@ionic/vue";
import { useModalStore } from "@/stores/useModalStore";
import { storeToRefs } from "pinia";
import { ModalInportOfxForm } from "@/components/ModalInportOfxForm";

export default defineComponent({
  setup(_, { slots }) {

    const modalStore = useModalStore()
    const {
      isOpenReceipt,
      isOpenExpenditure,
      isOpenCategory,
      isOpenCategoryDetails,
      isOpenExpenditureDetails,
      isOpenReceiptDetails,
      isOpenImportOfx,
    } = storeToRefs(modalStore)

    const {
      onCloseReceipt,
      onCloseExpenditure,
      onCloseCategory,
      onCloseCategoryDetails,
      onCloseExpenditureDetails,
      onCloseReceiptDetails,
      onCloseImportOfx,
    } = modalStore
    return () => (
      <>
        {slots.default?.()}
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
          backdropDismiss={false}
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
          backdropDismiss={false}
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
          backdropDismiss={false}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseReceiptDetails}
              details={isOpenReceiptDetails.value}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={isOpenImportOfx.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalInportOfxForm
              onClose={onCloseImportOfx}
            />
          </IonContent>
        </IonModal>
      </>
    )
  }
})
