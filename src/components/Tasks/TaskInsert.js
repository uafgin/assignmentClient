import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { insertTask } from "../../actions";
import "./TaskInsert.scss";
import _ from "lodash";

class TaskInsert extends React.Component {
  renderError({ error, touched }) {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div
        className={`field required ${meta.error && meta.touched && "error"}`}
      >
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };
  renderbrowser = ({ input, label, meta }) => {
    return (
      <div
        className={`field required ${meta.error && meta.touched && "error"}`}
      >
        <div className="ui action input">
          <input
            type="text"
            value={
              input.value && input.value.length > 0
                ? input.value[0].name
                : label
            }
            placeholder={label}
            readOnly
          />
          <label className="ui icon button" htmlFor="uploadFile">
            <i className="attach icon"></i>
          </label>
          <input
            className="hiddenFileBrowser"
            id="uploadFile"
            {..._.omit(input, "value")}
            type="file"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  onSubmit = (formValues) => {
    this.toBase64(formValues.Picture[0]).then((data) => {
      this.props.insertTask({ ...formValues, Picture: data });
      this.props.dispatch(reset("TaskInsert"));
    });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="Text"
            component={this.renderInput}
            label="Enter picture name"
          />
          <Field
            name="Picture"
            label="Upload image"
            component={this.renderbrowser}
          />
          <button className="ui button primary">Add</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.Text) errors.Text = "you must enter a text";
  if (!formValues.Picture) errors.Picture = "you must choose apicture";
  if (formValues.Picture) {
    if (formValues.Picture.length === 0) {
      errors.Picture = "you must choose apicture";
    }
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    tasks: state,
  };
};

const taskInsert = connect(mapStateToProps, { insertTask })(TaskInsert);

export default reduxForm({
  form: "TaskInsert",
  validate: validate,
})(taskInsert);
