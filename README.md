# Company Passport - Technical Specification Documentation

> **For a live version of this documentation, see [https://dutchblockchaincoalition.github.io/CompanyPassport](https://dutchblockchaincoalition.github.io/CompanyPassport)**

This repository contains the source code of the technical documentation for the Company Passport project.

## Contribution Guideline

The documentation is built using a static site generator ([Jekyll](https://jekyllrb.com/)) and hosted on [GitHub Pages](https://pages.github.com/) for better readability. You can make contributions to this documentation by forking the repository, making the changes and opening a PR. Once your the PR is accepted the site is automatically built and deployed. The Jekyll theme that is used is [Bulma Clean Theme](https://www.csrhymes.com/bulma-clean-theme/).

### Local environment setup

In order to preview the changes you make, you will need to install Jekyll. If you have Ruby and RubyGems installed, you can simply run `gem install bundler jekyll`. Otherwise, please follow the [Jekyll Installation Guide](https://jekyllrb.com/docs/installation/) for your operating system. Once Jekyll is installed, you can install the dependencies for our site.

```sh
cd docs # this is the root of our documentation source
bundle install --gemfile Gemfile.dev
```

#### Running a local server

Once Jekyll is installed, you can run a local development server to preview the site by running the following command:

```sh
# in <ROOT>/docs
bundle exec --gemfile Gemfile.dev jekyll serve
```

> **TIP:** If you use the Live Reload plugin in your editor, you can connect to the server by adding the `--livereload` parameter.

### Structure

When the site is deployed, the url routing is generated based on the directory structure of the `/docs` directory.

Some examples:

- The `/docs/index.md` file will be deployed at `https://dutchblockchaincoalition.github.io/CompanyPassport`
- The `/docs/technical/index.md` file will be deployed at `https://dutchblockchaincoalition.github.io/CompanyPassport/technical`
- The `/docs/technical/status-list.md` file will be deployed at `https://dutchblockchaincoalition.github.io/CompanyPassport/technical/status-list`

### Creating a page

To create a new page, simply create a new markdown file in the desired location. At the top of the document, add the following [frontmatter](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g) to set the layout and title of your page.

```yaml
---
layout: page
title: <the title of your page>
---
For more advanced configuration options, please see the frontmatter options for [Jekyll](https://jekyllrb.com/docs/front-matter/) and the [Bulma Clean Theme documentation].
```

### Top navigation

The top navigation bar is configured in `/docs/_data/navigation.yml`. Please see [the documentation](https://www.csrhymes.com/bulma-clean-theme/docs/navigation/top-navigation/) for additional info.

### Assets and links

Images and other static assets that you want include into your documentation should be added to the `/docs/assets` directory. All the files located in this directory are copied in the build process and will be included in the deployment. PlantUMl diagrams are built automatically and don't need to be generated manually. See the [section on PlantUML diagrams](#plantuml-diagrams) for more info.

Although most of the documentation can be written using normal markdown, the format for linking is a little different. Using this format ensures that the file paths are set correctly during local development, as well as when the site is being deployed.

#### Internal site links

Let's say you want to include an image located in the `/docs/assets/my_image.png` directory. Normally, you would do that by adding `![image name](relative-path-to-assets-dir)` to your markdown file. Instead of passing a relative file path, we can specify a relative path (with the `/docs` directory as the root) and let Jekyll figure out the rest. So instead, you include the image by writing `![image name]({{'/assets/my_image.png' | relative_url}})`. By adding the `relative_path` filter, Jekyll will prefix the file path with the correct base url.

> **NOTE:** This formatting rule does not only apply to images, but to all internal site links.

#### Source code links

If you want to link to a source file within this repository, you can do so by using the following custom variables:

- `{site.github_repo}` - will be substituted with `https://github.com/DutchBlockchainCoalition/CompanyPassport`
- `{site.assets_src}` - will be substituted with `https://github.com/DutchBlockchainCoalition/CompanyPassport/blob/main/docs/assets`

So let's say you want to link to a PlantUML source file located at `/docs/assets/my_diagram.puml`, you can do so by formatting your link as such: `[view source file]({{ site.assets_src }}/my_diagram.puml)

### PlantUML Diagrams

PlantUML is a scripting language for creating software diagrams by writing code. This has various benefits, including simplified version management. Most markdown renderers have no native support for rendering PlantUML diagrams and rendering a diagram therefore usually requires the author to manually export the image. This can become quite tedious and lead to version mismatches between the diagram source code and rendered image. Luckily, GitHub Actions and Jekyll can help us out.

The site's current configuration allows you to add PlantUML diagrams in two ways:

1. By inlining the diagram source code within your markdown file
2. By defining and referencing a PlantUML source file

#### **Option 1:** Inline

For small diagrams, you can embed the PlantUML source code directly into your markdown file as follows:

```
{% plantuml %}
@startuml
Bob -> Alice : hello
@enduml
{% endplantuml %}
```

It's recommended to use a [separate source](#option-2-using-a-source-file) file for larger diagrams.

#### **Option 2:** Using a source file

During the build process, all source files within the `/docs/assets` directory that end with `.puml` are compiled to an `.svg` file. This means that order to include your diagram into your document, you will have to use the `.svg` extension.

##### Example

In order to display a diagram of which the source file is `/docs/assets/my_diagram.puml`, you will need to reference it like this `![my diagram]({{'/assets/my_diagram.svg' | relative_url}})` (`.svg`, not `.puml`).

> **NOTE:** Jekyll doesn't support this feature natively. When developing locally, the diagrams are generated by the `:post_build` hook in `/docs/_plugins/generate_diagrams_hook.rb`. In CI however, this is not possible because GitHub Pages currently only allows a curated selection of plugins to be used. Therefore this is handled by a separate CI workflow action.
