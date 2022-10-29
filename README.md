# DnD Trap

usage is from Desktop

- team -> each players HP + name + resistance
  - enter manually via form (evtl 1 input field mit `{name}, {hp}, {yes/no for resistance}` -> hit enter to parse)
- each player can roll a die (d20)
  - do some magic calculations
  - show result of dice roll -> success/miss -> lose hp
- show team

## Deployment

```sh
BUCKET_NAME="YOUR_BUCKET_NAME"

npm run build
aws s3 rm s3://${BUCKET_NAME} --recursive
aws s3 cp dist s3://${BUCKET_NAME} --recursive
```

## Resources

- [Chakra UI](https://chakra-ui.com/getting-started)
- [Chakra Templates](https://chakra-templates.dev/page-sections/hero)
