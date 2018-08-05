import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Input from "../../utils/forms/input";
import ValidationRules from '../../utils/forms/validationRules';

class LoginForm extends Component {
  state = {
    type:'Login',
    action:'Login',
    actionMode:'Not a user, Register',
    hasErrors: false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          confirmPass: "password"
        }
      }
    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules
    let valid = ValidationRules(value, rules, formCopy);

    console.log('Valid', valid)

    formCopy[name].valid = valid;


    this.setState({
      form: formCopy
    });
  };

  confirmPassword = () => (
    this.state.type != 'Login' ?
        <Input
            placeholder="Confirm your password"
            type={this.state.form.confirmPassword.type}
            value={this.state.form.confirmPassword.value}
            onChangeText={ value => this.updateInput("confirmPassword",value) }
            secureTextEntry
        />
    :null
  )

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
        type: type === 'Login' ? 'Register' : 'Login',
        action: type === 'Login' ? 'Register' : 'Login',
        actionMode:  type === 'Login' ? 'Not registered, Login' : 'Not a user, Register',
    })
  }


  render() {
    return (
      <View style={styles.formInputContainer}>
        <Input
          placeholder="Enter your email"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput("email", value)}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
        />

        <Input
          placeholder="Enter your password"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput("password", value)}
          secureTextEntry
        />

        {this.confirmPassword()}

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.action}
            color="#fd9727"
          />
        </View>

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.actionMode}
            color="lightgrey"
            onPress={this.changeFormType}
          />
        </View>

        <View>
          <Button
            title="I'll do it later"
            color="lightgrey"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400
  },
  buttonStyleAndroid: {
    marginBottom:10,
    marginTop:10
  },
  buttonStyleIos: {
      marginBottom:0
  },
});

export default LoginForm;
