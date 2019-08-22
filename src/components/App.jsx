import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, editReminder, getReminders } from '../actions';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            id: 0,
            isEditing: false,
            dueDate: '',
        }

    }



    inputHandler(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.addReminder();
        }
    }

    addReminder = () => {

        let { text, dueDate } = this.state;
        if (text !== '' && dueDate !== '' && new Date(dueDate) > new Date() ) {
            this.setState({
                text: '',
                dueDate: ''
            })
            var id = 0;
            if (this.props.reminders.length > 0) {
                id = this.props.reminders[this.props.reminders.length - 1].id + 1 // localstorage
            }
            this.props.addReminder({ text, dueDate, id })
        }
        else (
            alert("Please enter a reminder with an unpcoming date & time!")
        )

    }

    deleteReminder = (id) => {
        this.props.deleteReminder(id)
    }

    editReminder = (obj) => {
        this.setState({
            id: obj.id,
            text: obj.text,
            isEditing: true,
        })



    }

    onUpdate = () => {
        var updateRem = {
            text: this.state.text,
            id: this.state.id,
        }
        this.props.editReminder(updateRem);
        this.setState({
            id: 0,
            text: '',
            isEditing: false,
            dueDate: ''
        })
    }

    componentWillMount() {
        this.props.getReminders()
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group" style={{ width: 500, margin: 'auto' }}>
                {
                    reminders.map((reminder, index) => {
                        return (
                            <li key={index} className="list-group-item">
                                <div>
                                    <h4>{reminder.text}</h4>
                                    <i>{moment((reminder.dueDate)).fromNow()}</i>
                                    <button type="button"
                                        className="btn btn-danger"
                                        onClick={() => { this.deleteReminder(reminder.id) }}
                                        style={{ margin: 5 }}

                                    >
                                        delete
                                </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => { this.editReminder(reminder) }}
                                        style={{ margin: 5 }}

                                    >
                                        Edit
                                </button>
                                </div>
                            </li>
                        )
                    })
                }

            </ul>
        )
    }

    render() {
        return (
            <div style={{ textAlign: "center" }} className="App">
                <div >
                    <h1>Reminder Pro</h1>
                    <hr />
                </div>

                <div className="form-inline">
                    <div className="form-group">
                        <input
                            style={{ margin: 5 }}
                            value={this.state.text}
                            name='text'
                            className="form-control"
                            placeholder="I have to.."
                            onChange={(e) => this.inputHandler(e)}
                            onKeyPress={this.handleKeyPress}
                        />
                        <input
                            style={{ margin: 5 }}
                            className="form-control"
                            type="datetime-local"
                            name='dueDate'
                            value={this.state.dueDate}
                            onChange={(e) => this.inputHandler(e)}
                        />
                    </div>
                    {   //ternary used
                        this.state.isEditing ?
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => { this.onUpdate() }}

                            >
                                Update
                    </button>
                            :
                            <button
                                style={{ margin: 5 }}
                                type="button"
                                className="btn btn-success"
                                onClick={() => { this.addReminder() }}

                            >
                                Add Reminder
                    </button>
                    }


                </div>

                <div  >
                    {this.renderReminders()}
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    reminders: state.reminders
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addReminder,
    deleteReminder,
    editReminder,
    getReminders
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);