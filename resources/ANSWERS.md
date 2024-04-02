# Customer / Prospect Q&As
### Question 1


>Hello,
>
>I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
>
> * Records
> * Indexing
>
>I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."
>
>Cheers, George

Hi George,

Thanks for reaching out and sharing your open questions. 

An **index** holds all the data you want to make searchable. This could be for instance in your case a product feed or a set of FAQ articles.
Each product or FAQ article in our example would be a **record** in your index. Each record would consist of attributes such as SKU, product name, product description, color, size - those can be used for a variaty of usecases, including search or filtering.

[**Custom Ranking**](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/#custom-ranking) allows you to define specific attributes, which will have a higher weight in your search results. For instance you might want to rank popular products higher in the results. You can find more examples in the linked help page for inspiration. Algolia supports all boolean or numeric attributes for your custom ranking, so these could include total number of sales or returns, star rating, number of views or likes etc.

Hope this helps and let me know, if you have any more questions.

Best,
David

### Question 2

>Hello,
>
>Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.
>
>Regards, Matt

Hi Matt and happy Tuesday!

Sorry to hear that but thanks for sharing your valuable feedback. I'll flag this with our product team and will see, if we can further improve the user experience. I'll get back to you once I hear back from them. What you can do in the meantime is to [clear](https://www.algolia.com/doc/api-reference/api-methods/clear-objects/) or [delete indexes](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices/#delete-indices-with-the-api) via our APIs. 

Please let me know, if that works for you or if you need help with anything else.

Best,
David

### Question 3

>Hi,
>
>I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?
>
>Regards, Leo


Hi Leo,

Thanks for reaching out. Implementing Algolia isn't complicated and I've seen customers do it sometimes within a day.

The high-level process would look like this:

* Create an Algolia account and start sending us your data, which should be searched (e.g. product feed). Data can be sent via APIs, Flat Files, Manual UI uploads or our native integrations into the most popular shop systems (e.g. Shopify). For starters you can also use one of our dummy data sets and basically follow our [quick start tutorial (2 Minutes)](https://www.algolia.com/doc/guides/getting-started/quick-start/).
* Tweak the relevany of your results by adding filter options or sending user-level behavioral data. This can be revisited at any time and Algolia will already give you results back out-ofthe-box without having to deep-dive into all possible options.
* Build your own UI and integrate with our APIs or use one of our Frontend Libraries to build a search frontend within minutes. In any case, Algolia offers easy to use libraries for most popular frameworks and programming languages such as React, Vue, Swift, Kotlin and [many more](https://www.algolia.com/doc).

I hope this gives you a good first impression and please let me know, if you have any additional questions.

Best,
David
