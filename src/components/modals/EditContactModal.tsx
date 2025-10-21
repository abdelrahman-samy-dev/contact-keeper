import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeEditContactModal } from '../../store/slices/uiSlice';
import { clearCurrentContact } from '../../store/slices/contactsSlice';
import Modal from '../common/Modal';
import ContactForm from '../forms/ContactForm';

const EditContactModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { modals } = useAppSelector((state) => state.ui);
    const { currentContact } = useAppSelector((state) => state.contacts);

    const handleClose = () => {
        dispatch(closeEditContactModal());
        dispatch(clearCurrentContact());
    };

    const handleSuccess = () => {
        dispatch(closeEditContactModal());
        dispatch(clearCurrentContact());
    };

    return (
        <Modal
            isOpen={modals.editContact}
            onClose={handleClose}
            title="Edit Contact"
            size="lg"
            closeOnBackdropClick={true}
        >
            <ContactForm contact={currentContact} onSuccess={handleSuccess} />
        </Modal>
    );
};

export default EditContactModal;
