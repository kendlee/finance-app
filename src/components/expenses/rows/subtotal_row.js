import _ from 'lodash';
import { sum } from '../../../utils';

import BaseRow from './base_row';

export default class SubtotalRow extends BaseRow {
    computeUser(userName) {
        const userTotal = _(this.getState().users[userName].claims)
            .map((claim, itemName) => {
                const {price, quantity, claimedQuantity, shared} = this.getState().items[itemName];
                return shared ? (claimedQuantity ? claim * quantity / claimedQuantity * price : 0)
                    : claim * price;
            })
            .reduce(sum);

        return userTotal;
    }

    computeTotal() {
        return _(this.getState().items)
            .map(item => item.quantity * item.price)
            .reduce(sum);
    }
}