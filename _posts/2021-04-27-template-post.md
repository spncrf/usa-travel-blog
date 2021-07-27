---
title: "Post Template"
document_author: "Spencer"
share: true
show_date: true
related: false
author_profile: false
comments: false
header:
  image: /assets/images/image.jpg
---

Here is an opening paragraph. random text random text random text random text random text.

{% capture fig_img %}
![alt-text]({{ site.url }}{{ site.baseurl }}/assets/images/image.jpg)
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>Photo Caption</figcaption>
</figure>

Here is some more text
