import _ from 'lodash';
import React, { Component } from 'react';

import './expense_form.css';
import AddItemForm from './add_item_form';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['user a','user b','user c'],
            items: [
                {name: 'item a', price: 100, quantity: 10},
                {name: 'item b', price: 200, quantity: 5},
                {name: 'item c', price: 300, quantity: 3}
            ]
        }
    }

    render() {
        return (
            <div className="Expense-form">
                <h2>Expense form</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderItemHeader()}
                            {this.renderNameHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                        {this.renderSubtotalRow()}
                        {this.renderItemAdderRow()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderItemHeader() {
        return _.map(['Name', 'Quantity', 'Price'], name => <th key={name} className={name.toLowerCase()}>{name}</th>)
    }

    renderNameHeader() {
        return _.map(this.state.users, user => {
            return (
                <th key={user} className="users">{user}</th>
            );
        });
    }

    renderBody() {
        return _.map(this.state.items, item => {
            return (
                <tr key={item.name}>
                    {this.renderItem(item)}
                    {this.renderExpense()}
                </tr>
            );
        })
    }

    renderItem(item) {
        return [
          (<td key='name'>{item.name}</td>),
          (<td className="quantity" key='quantity'>{item.quantity}</td>),
          (<td className="price" key='price'>{item.price}</td>)
        ];
    }

    renderExpense() {
        return _.map(this.state.users, user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control"/>
                    </div>
                </td>
            );
        });
    }

    renderSubtotalRow() {
        return (
            <tr>
                <td className="price" colSpan={3}>{this.computeTotal()}</td>
            </tr>
        )
    }

    renderItemAdderRow() {
        return (
            <tr>
                <td><AddItemForm onItemAdd={data => console.log(data)} /></td>
            </tr>
        );
    }

    computeTotal() {
        return _(this.state.items).map(item => item.quantity * item.price)
            .reduce((result,item) => result + item, 0)
    }
}

export default ExpenseForm;