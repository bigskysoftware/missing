export default {
    layout: "release.eta",
    tags: "release",
    backTo: "/releases Releases",
    url: ({ data: { release } }) => `./${release}/`
}