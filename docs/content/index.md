---
title: Docs
---

::u-page-hero
---
:title: site.name
:description: package.description
orientation: horizontal
---
![@outloud/css](/images/hero.png)

#links
  :::u-button
  ---
  color: neutral
  size: xl
  to: /getting-started
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button{:to="package.repository.url"}
  ---
  color: neutral
  icon: simple-icons-github
  size: xl
  variant: outline
  target: _blank
  ---
  View on Github
  :::
::
