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
            })
            .catch((err) => {
                console.log(err);
                done();
            });

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

        it("should not create a topic with missing title or description", (done) => {

            Topic.create({
                title: "This is my topic title",
            })
            .then((post) => {

                done();
            })
            .catch((err) => {

                expect(err.message).toContain("Topic.body cannot be null");
                expect(err.message).toContain("Topic.id cannot be null");
            })
        })
    });

    describe("#getPosts()", () => {

        it("should associate a topic and a post together", (done) => {
            
            Post.create({
                title: "This is a new test post",
                body: "It has lots of information",
                topicId: this.topic.id
            })
            .then((post) => {

                expect(post.title).toBe("This is a new test post");
                expect(post.body).toBe("It has lots of information");
                done()
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        })
    })
 
});

//Test for getPosts() method
    //create and associate post with topic in scope
    //returns array of Post objects associated with the topic the getPosts() method was called on
    //confirm that associated post is returned when getPosts() method is called
