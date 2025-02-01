export default gql`
  mutation PhoneCreate($createPhoneInput: CreatePhoneInput!) {
    phoneCreate(createPhoneInput: $createPhoneInput) {
      id
      has_whatsapp
      phone
    }
  }
`