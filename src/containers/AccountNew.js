'use strict'

import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import debounce from 'debounce'
import AccountSeed from '../components/AccountSeed'
import { words } from '../util/random'
import { brainWalletAddress } from '../util/native'
import { selectAccount } from '../actions/accounts'
import AccountIcon from '../components/AccountIcon'
import AppStyles from '../styles'

const mapDispatchToProps = (dispatch) => {
  return {
    addAccount: (account) => {
      dispatch(selectAccount({
        seed: account.seed,
        address: account.address,
        name: account.name
      }))
      Actions.accountSetPin()
    }
  }
}

export class AccountNew extends Component {
  constructor (props) {
    super(props)

    const seed = words()

    this.state = {
      seed: seed,
      address: '',
      name: ''
    }

    this.updateAddress(this, seed)
  }

  async updateAddress (self, seed) {
    try {
      let address = await brainWalletAddress(seed)
      self.setState({
        seed: seed,
        address: address
      })
    } catch (e) {
      // this should never fail
    }
  }

  render () {
    return (
      <ScrollView style={AppStyles.view}>
        <AccountIcon style={AppStyles.icon} seed={'0x' + this.state.address} />
        <Text style={AppStyles.hintText}>Account Name</Text>
        <TextInput
          placeholder='Name for this account'
          value={this.state.name}
          style={AppStyles.inputValue}
          editable
          multiline={false}
          returnKeyType='next'
          numberOfLines={1}
          fontSize={12}
          autoFocus
          onChangeText={(text) => { this.setState({name: text}) }}
        />
        <Text style={AppStyles.hintText}>Recovery Phrase (for backup)</Text>
        <AccountSeed seed={this.state.seed} onChangeText={
          debounce((text) => { this.updateAddress(this, text) }, 100)
        } />
        <Text style={AppStyles.hintText}>Address</Text>
        <TextInput
          editable={false}
          style={[AppStyles.inputValue, AppStyles.inputValueSmall]}
          value={`0x${this.state.address}`}
          />
        <View style={AppStyles.buttonContainer}>
          <Button
            onPress={() => this.props.addAccount({
              seed: this.state.seed,
              address: this.state.address,
              name: this.state.name
            })}
            title='Set up PIN'
            color='green'
            accessibilityLabel='Press to set up the PIN for the account'
          />
        </View>
      </ScrollView>
    )
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(AccountNew)
