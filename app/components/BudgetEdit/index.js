// @flow
import React from 'react';
import * as rules from '../../rules';
import handleUpdateItem from '../../helpers/handleUpdateItem';
import { BudgetType } from '../../types';

const handleSave = (nameInput, noteInput, params) => {
    const newName = nameInput.value;
    const newNote = noteInput.value;

    if (!newName || !newNote) return;

    params.push({
        name: newName,
        note: newNote
    });

    handleUpdateItem(...params);
};

type Props = {
    budget: BudgetType,
    onRemove: () => void,
    updateBudget: () => void,
    router: Object
};

class BudgetEdit extends React.Component {
    state = {
        edit: false
    };

    props: Props;

    render() {
        const { edit } = this.state;
        const { budget, updateBudget } = this.props;
        const { name, note, _id, completed, updatedAt } = budget;
        const time = new Date(updatedAt);

        let nameInput;
        let noteInput;

        return (
            <div>
                { (edit) ?
                    <form>
                        <input
                            type="text"
                            defaultValue={name}
                            maxLength={`${rules.NAME_LENGTH}`}
                            ref={(ref) => { nameInput = ref; }}/>

                        <textarea
                            rows="10"
                            cols="50"
                            defaultValue={note}
                            maxLength={`${rules.NOTE_LENGTH}`}
                            ref={(ref) => { noteInput = ref; }}/>
                    </form>
                    :
                    <div style={{ padding: '10px 0' }}>
                        <div>{name}</div>
                        <div style={{ paddingTop: '10px' }}>{note}</div>
                    </div>
                }

                <div>
                    <button
                        className="btn-status"
                        onClick={(e) => handleUpdateItem(e, updateBudget, _id, {
                            completed: !completed
                        })}>

                        Status: { completed ? 'Done' : 'Not Done'}
                    </button>
                    <span className="datetime">
                        Last Updated: { time.toLocaleString() }
                    </span>

                    {(edit) ?
                        <button
                            className="btn-save"
                            onClick={(e) => {
                                handleSave(nameInput, noteInput, [e, updateBudget, _id]);
                                this.setState({ edit: false });
                            }}>

                            SAVE
                        </button>
                        :
                        <button
                            className="btn-edit"
                            onClick={() => {
                                this.setState({ edit: true });
                            }}>

                            EDIT
                        </button>
                    }

                </div>
            </div>
        );
    }
}

export default BudgetEdit;

