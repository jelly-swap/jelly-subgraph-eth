# Jelly Subgraph 8-)

## Install it locally

All you need to do is to clone the repo and install Graph CLI

Clone repo - git clone https://github.com/jelly-swap/jelly-subgraph-eth

Graph CLI - yarn global add @graphprotocol/graph-cli

### subgraph.yaml

subgraph.yaml is a configuration for our subgraph. Uses our contract address and listen for the emitted events, when any event is emitted it's been catched and eventHandler is triggered. Also model of our entities are located in subgraph.yaml as well. For more information you can visit: [Official documentation](https://thegraph.com/docs/define-a-subgraph#the-subgraph-manifest)

### Create new entity

To create new entity visit the schema.graphql in root folder and there u can create your own entity. It's required to have ID here is some example entity:

```type User @entity {
  id: ID!

  username: String!
  age: BigInt!
  address: Bytes!
}
```

After creating the new entity we need to refer it in subgraph.yaml, without reference it won't be part of the available queries later in our graph.

subgraph.yaml have special place to save models. Place your entity in -entites:. For example

```-entites:
      User
```

Finally we need to compile the code to have access to newly created entity. To do that simply run:

```npm run codegen

```

Now in our mappings.ts file we can import User model from "../generated/schema";

### Handlers

Handlers are used to handle event which are emitted from our smart contract. Subgraph is configured to listen on the contract address for occurence of new events. Once when these events are emitted our graph catch them trigger our event handlers.

Event handlers often used to extract some data of the event, fill our entity and save it.

Each event has own event handler for example if our user deposit some amount of ether in our contract and we are emitting ```event Deposit(uint256 amount, address sender);

````
inside our mapping.ts file we will have handler for this event simply called handleDeposit(event: Deposit);

Our handlers are refered in subgraph.yaml, for example:

```eventHandlers:
      - event: Deposit(uint256, address)
      handler: handleDeposit
````

### Fill entity and save it

First we need to determine what id will be use for our model. Since we have User model we can use for id the ADDRESS property.
To access already created user we need to call model and provide address as id. The code looks like this:

```let user = UserEntity.load(event.params.address);

```

If this user have some iteraction for first time we won't have any data about him so simply line above will return null, so we need to create it.

Creating new user is very simply actually all we need to do is:

```if(user == null) {
      user = new UserEntity(event.params.address);
}
```

Here we pass event.params.address for id so after that we can access this user by his address.

Ok once when we have our user we need to fill his properties:

```user.name = event.params.name;
   user.age = event.params.age;
```

and finally we need to save it:

```user.save();

```

### Event.params

Event params contains all values which are emitted from the event in the smart contract, often they are used to populate values of our entites.

### Deploy Subgraph

Before deploying our subgraph we need to register our access token. To do that login to the site [Graph dashboard](https://thegraph.com/explorer/dashboard) and copy your key. Then in terminal you can run

```graph auth https://api.thegraph.com/deploy/ MY_PRIVATE_KEY

```

Replace MY_PRIVATE_KEY with your keep and DON'T DELETE space infront of MY_PRIVATE_KEY

Once we are done with our work and key is setted, we need to deploy it. Subgraph are stored on IPFS. Before deploy we might use:

```npm run build

```

to compile and build the code if there is any issue with our entity or handler.

After successful build we need to deploy it. To do that run

```npm run deploy

```

If your previously deployed subgraph is still in status Syncing, it will be immediately replaced with the newly deployed version. If the previously deployed subgraph is already fully synced, Graph Node will mark the newly deployed version as the Pending Version, sync it in the background, and only replace the currently deployed version with the new one once syncing the new version has finished. This ensures that you have a subgraph to work with while the new version is syncing.

## Query The Graph

### Using The Graph Explorer

The Graph Explorer and its GraphQL playground is a useful way to explore and query deployed subgraphs on the hosted service

[Jelly Subgraph](https://thegraph.com/explorer/subgraph/andonmitev/jelly-swap)

### Example

This query lists all the new contracts our mapping has created.

```{
  newContracts {
    sender
  	receiver
  }
}
```

To take specific contract we might use

```{
  newContracts(id: "ID_OF_THE_CONTRACT_WHICH_IS_USED_TO_CREATE_THE_ENTITY") {
    inputNetwork
    outputNetwork
  }
}
```
