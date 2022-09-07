import React, { FunctionComponent, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal'
import styles from './styles';
import { Colors } from '../../../constants/Colors'
import Icon from '../../../components/Icon'
import { AssemblyProps } from './interfaces';
import GlobalStyles from '../../../styles/GlobalStyles';

const AssemblyModal: FunctionComponent<AssemblyProps> = ({type, handleClose}) => {
    useEffect(() => {
        setTimeout(handleClose, 3000)
    }, [])

    const renderText = () => {
        switch (type) {
            case 'finalizada':
                return 'Assembleia encerrada';
            case 'cancelada':
                return 'Assembleia cancelada';
            case 'repEncerrada':
                return 'Representação encerrada';
            default:
                return '';
        }
    }

    return (
        <Modal
            isVisible={!!type}
            onBackButtonPress={handleClose}
            onBackdropPress={handleClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalClose}>
                    <TouchableOpacity onPress={handleClose}>
                        <Icon name="close" size={25} color={Colors.Black}/>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.modalTitle, GlobalStyles.marginBotSm]}>
                    {renderText()}
                </Text>
            </View>
        </Modal>
  );
}

export default AssemblyModal;