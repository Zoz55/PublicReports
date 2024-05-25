export async function load({ params }) {
    console.log(params.catchall)
  return {name :  params.catchall}
}