const postsLoading = () => {
    fetch('https://www.reddit.com/top.json').then( (response) => { /*fetch - запрос к серверу*/
         response.json().then(function(responseData) {
            const posts = responseData.data.children;
            console.log(posts);
            posts.forEach(post => {
                const postCard = document.createElement('div'); /*создаём элементы*/
                const postImages = document.createElement('img');
                const title = document.createElement('a');
                const comments = document.createElement('a');
                const preview = document.createElement('div');
                const description = document.createElement('p');

                if (
                    post.data.thumbnail == 'default' ||
                    post.data.thumbnail == 'self'
                ) {
                    postImages.src = 
                        'https://ru.inettools.net/upload/Q7tCv6FnB9qlIDhsCxGPGeSrhHZ17Cauep4azyCr/tenor.aheYG.gif';
                } else postImages.src = post.data.thumbnail;

                title.innerHTML = post.data.title; /*задаём, что должно показываться юзеру*/
                title.href = `https://www.reddit.com${post.data.permalink}`; /*ссылки, куда перейдет юзер по клику*/
                comments.href = `https://www.reddit.com${post.data.permalink}`;
                comments.innerHTML = `${post.data.num_comments} comments`; /*как будет показываться кол-во комментов*/
                description.innerHTML = `It was posted by ${post.data.author} ${new Date( /*задаём описание поста*/
                    post.data.created_utc * 1000
                ).getHours()} hours ago on ${
                    post.data.subreddit_name_prefixed
                }`;

                postCard.appendChild(postImages); /*возвращаем ссылки на добавленные элементы*/
                preview.appendChild(title);
                preview.appendChild(description);
                preview.appendChild(comments);
                postCard.appendChild(preview);
                document.body.appendChild(postCard);

                postCard.classList.add('postCard'); /*добавляем элементу указанные классы*/
                title.classList.add('title');
                comments.classList.add('comments');
                description.classList.add('description');
            });
        });
    });
    setTimeout(postsLoading, 10000); /*вызов функции через заданный период времени, 10000=10сек*/
    console.log('All posts have been loaded.');
};

postsLoading();