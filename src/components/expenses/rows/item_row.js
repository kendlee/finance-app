import _ from 'lodash';
import classNames from 'classnames';

import React from 'react';
import { connect } from 'react-redux';
import BaseRow from './base_row';

import { removeItem, toggleSharing, updateClaim } from '../../../actions/expense_actions';

class ItemRow extends BaseRow {
    determineRowStyle() {
        const { shared, quantity, claimedQuantity } = this.props.item;
        if (shared) {
            return 'table-success';
        } else {
            const remainingQuantity = quantity - claimedQuantity;
            return classNames({
                'table-success': remainingQuantity === 0,
                'table-danger': remainingQuantity > 0,
                'table-warning': remainingQuantity < 0
            });
        }
    }

    renderHeaderCells() {
        const { name, quantity, price } = this.props.item;
        return [
            (<th key='name'>{name} <button className="btn btn-danger btn-sm"
                    type="button" onClick={() => this.props.removeItem(this.props.item)}>-</button>
            </th>),
            (<td className="quantity" key='quantity'>{quantity}</td>),
            (<td className="price" key='price'>
                {price * quantity}<br/>
                <small className="text-muted">({price})</small>
                </td>)
        ];
    }

    renderSharingCell() {
        const { item } = this.props;
        const { name, shared } = item;
        return (
            <td className="shared">
                <div className="form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox"
                            checked={shared}
                            onChange={event => this.props.toggleSharing(name, event.target.checked)}/>
                    </label>
                </div>
                {(shared) ? <small className="text-muted">({ this.computeShare(item).toFixed(2) })</small> : ''}
            </td>
        );
    }

    computeShare(item) {
        return item.computeShare(1, _.size(this.props.users));
    }

    renderUserCells() {
        const { name } = this.props.item;
        return _.keys(this.props.users).map(user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control" 
                            value={this.props.users[user].claims[name]}
                            onChange={event => this.props.updateClaim(user, name, event.target.value)} />
                    </div>
                </td>
            );
        });
    }

}

export default connect(null, { 
    removeItem, 
    toggleSharing, 
    updateClaim 
})(ItemRow);