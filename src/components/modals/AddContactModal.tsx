import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeAddContactModal } from '../../store/slices/uiSlice';
import Modal from '../common/Modal';
import ContactForm from '../forms/ContactForm';

const AddContactModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { modals } = useAppSelector((state) => state.ui);

    const handleClose = () => {
        dispatch(closeAddContactModal());
    };

    const handleSuccess = () => {
        dispatch(closeAddContactModal());
    };

    return (
        <Modal
            isOpen={modals.addContact}
            onClose={handleClose}
            title="Add New Contact"
            size="lg"
            closeOnBackdropClick={true}
        >
            <ContactForm onSuccess={handleSuccess} />
        </Modal>
    );
};

export default AddContactModal;
