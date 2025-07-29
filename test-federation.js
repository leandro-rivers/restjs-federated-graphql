const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
const { createHttpLink } = require('@apollo/client/link/http');

// Test the Orders service
async function testOrders() {
  console.log('Testing Orders service...');
  
  const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:3001/graphql' }),
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      orders {
        id
        customerId
        productName
        quantity
        total
        status
      }
    }
  `;

  try {
    const result = await client.query({ query });
    console.log('✅ Orders service is working!');
    console.log('Orders:', result.data.orders);
  } catch (error) {
    console.log('❌ Orders service error:', error.message);
  }
}

// Test the Customers service
async function testCustomers() {
  console.log('\nTesting Customers service...');
  
  const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:3002/graphql' }),
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      customers {
        id
        name
        email
        phone
      }
    }
  `;

  try {
    const result = await client.query({ query });
    console.log('✅ Customers service is working!');
    console.log('Customers:', result.data.customers);
  } catch (error) {
    console.log('❌ Customers service error:', error.message);
  }
}

// Test the Gateway
async function testGateway() {
  console.log('\nTesting Gateway...');
  
  const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      orders {
        id
        customerId
        productName
        quantity
        total
        status
      }
      customers {
        id
        name
        email
        phone
      }
    }
  `;

  try {
    const result = await client.query({ query });
    console.log('✅ Gateway is working!');
    console.log('Federated query result:', result.data);
  } catch (error) {
    console.log('❌ Gateway error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Testing Federated GraphQL Setup...\n');
  
  await testOrders();
  await testCustomers();
  await testGateway();
  
  console.log('\n✨ Test completed!');
}

runTests().catch(console.error); 