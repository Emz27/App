import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import Popover from './Popover';
import MenuItem from './MenuItem';
import * as Expensicons from './Icon/Expensicons';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import compose from '../libs/compose';
import ONYXKEYS from '../ONYXKEYS';
import CONST from '../CONST';
import * as StyleUtils from '../styles/StyleUtils';
import withWindowDimensions from './withWindowDimensions';

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorPosition: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
    }),

    /** Username for PayPal.Me */
    payPalMeUsername: PropTypes.string,

    /** Should we show the Paypal option */
    shouldShowPaypal: PropTypes.bool,

    ...withLocalizePropTypes,
};

const defaultProps = {
    anchorPosition: {},
    payPalMeUsername: '',
    shouldShowPaypal: true,
};

const AddPaymentMethodMenu = props => (
    <Popover
        isVisible={props.isVisible}
        onClose={props.onClose}
        anchorPosition={props.anchorPosition}
    >
        <View style={StyleUtils.getPaymentMethodMenuWidth(props.isSmallScreenSize)}>
            <MenuItem
                title={props.translate('common.bankAccount')}
                icon={Expensicons.Bank}
                onPress={() => props.onItemSelected(CONST.PAYMENT_METHODS.BANK_ACCOUNT)}
            />
            <MenuItem
                title={props.translate('common.debitCard')}
                icon={Expensicons.CreditCard}
                onPress={() => props.onItemSelected(CONST.PAYMENT_METHODS.DEBIT_CARD)}
            />
            {props.shouldShowPaypal && !props.payPalMeUsername && (
                <MenuItem
                    title={props.translate('common.payPalMe')}
                    icon={Expensicons.PayPal}
                    onPress={() => props.onItemSelected(CONST.PAYMENT_METHODS.PAYPAL)}
                />
            )}
        </View>
    </Popover>
);

AddPaymentMethodMenu.propTypes = propTypes;
AddPaymentMethodMenu.defaultProps = defaultProps;

export default compose(
    withWindowDimensions,
    withLocalize,
    withOnyx({
        payPalMeUsername: {
            key: ONYXKEYS.NVP_PAYPAL_ME_ADDRESS,
        },
    }),
)(AddPaymentMethodMenu);
