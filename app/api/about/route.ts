export async function GET(){
    const about = {
                [id:1, title:"Title 1", description:"This is the description for the first title, The title is named 'Title 1'"]
        [id:2, title:"Title 2", description:"This is the description for the second title, The title is named 'Title 2'"]
    }
   return new Response(JSON.stringify({about}))
}