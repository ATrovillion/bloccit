const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;



//Test for Topic.create() method
    //valid arguments --> topic object created and stored in database
describe("Topic", () => {

    beforeEach((done) => {

        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."

            })
            .then((topic) => {
                this.topic = topic;



                Post.create({
                    title: "My first visit to Proxima Centauri b",
                    body: " I saw some rocks.",

                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        });
    });

    describe("#create()", () => {

        it("should create a topic object with a title and description", (done) => {

            Topic.create({
                title: "This is my topic title",
                description: "It's a nice topic"
            })
            .then((topic) => {

                expect(topic.title).toBe("This is my topic title");
                expect(topic.description).toBe("It's a nice topic");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });

        });

        it("should not create a topic with missing title or description", (done) => {

            Topic.create({
                title: "This is my topic title",
            })
            .then((topic) => {

                done();
            })
            .catch((err) => {

                expect(err.message).toContain("Topic.body cannot be null");
                expect(err.message).toContain("Topic.id cannot be null");
                done();
            })
        });
    });

    describe("#getPosts()", () => {

        it("should associate a topic and a post together", (done) => {
            
            Post.create({
                title: "This is a new test post",
                body: "It has lots of information",
                topicId: this.topic.id
            })
            .then((newPost) => {

                expect(post.title).toBe("This is a new test post");
                expect(post.body).toBe("It has lots of information");
                expect(post.topicId).toBe(this.topic.id)
                done()
            })
        })

        it("should return associated posts", (done) => {

            this.topic.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts.title).toBe("This is a new test post");
                expect(associatedPosts.body).toBe("It has lots of information");
                done();
            })
        })
    });

});

