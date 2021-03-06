import React from 'react';
import { BudgetType } from '../../types';
import TransactionForm from './TransactionForm';
import Transaction from './transaction/transaction';
import TransactionTotals from './TransactionTotals';

type Props = {
    budget: BudgetType,
    updateBudget: () => void
};

class Transactions extends React.Component {
    state = {
        create: false,
        transactionToUpdate: null
    };

    props: Props;

    handleCreateClick() {
        this.setState({ create: true, transactionToUpdate: null });
    }

    handleDiscardClick() {
        this.setState({ create: false, transactionToUpdate: null });
    }

    updateTransaction(t) {
        this.setState({ create: true, transactionToUpdate: t });
    }

    render() {
        const { create, transactionToUpdate } = this.state;
        const { budget } = this.props;
        let expenses = 0;
        let revenues = 0;
        let total = 0;
        const btnCreate = (<button
            className="btn-create"
            onClick={() => { this.handleCreateClick(); }}>

            CREATE TRANSACTION
        </button>);

        const btnDiscard = (<button
            className="btn-create"
            onClick={() => { this.handleDiscardClick(); }}>

            DISCARD TRANSACTION
        </button>);

        // sort the transactions by date
        const sortedTransactions = [...budget.transactions];
        sortedTransactions.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });

        const transactions = sortedTransactions.map((t) => {
            if (t.type === 'expense') {
                expenses += +t.amount;
            } else {
                revenues += +t.amount;
            }
            return (
              <Transaction
                  updateTransaction={this.updateTransaction.bind(this)}
                  data={t}
                  key={t._id} />
            );
        });

        total = revenues - expenses;

        return (
            <section className="transactions">
                <h2>Transactions</h2>

                <div className="transaction-table-row">
                    <div>DATE</div>
                    <div>DESCRIPTION</div>
                    <div>AMOUNT</div>
                </div>

                <div className="transaction-list">
                    { transactions }
                </div>

                <TransactionTotals expenses={expenses} total={total} revenues={revenues} />

                { (create) ?
                    <TransactionForm
                      transactionToUpdate={transactionToUpdate ? transactionToUpdate : null}
                      onDone={this.handleDiscardClick.bind(this)}
                      {...this.props} />
                    :
                    null
                }
                { (create) ? btnDiscard : btnCreate }
            </section>
        );
    }
}

export default Transactions;
