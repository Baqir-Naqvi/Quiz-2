$(
    () => 
    {
        $('#showformid').hide();

        $('#createblog').on('click',addblog);
        $(`#updateform`).on('click',updateblog);

        $('#showform').on('click', function () {
            $('#showformid').show();
            resetvalues();
           
        })
        
        $('#closeform').on('click', function () {
            $('#showformid').hide();
        })
        $('#getalldata').on('click', function () {
            getallblogs();
        })
        var isGetAll=false;

    }
)
var isUpdate=false;
function resetvalues()
{
    $('#titlearea').val('');
    $('#contentarea').val('');
    $('#categoryselect').val('');
}



function addblog()
{
    var title=$('#titlearea').val();
    var content=$('#contentarea').val();
    var category=$('#categoryselect').find(":selected").text();

    const newblog={
        BlogTitle:title,
        BlogContent:content,
        BlogCategory:category
    }
    $.ajax({
        url:`https://assign2api55.herokuapp.com/blogs/`,
        method:"POST",
        data:newblog,
         success:(blog)=>{
             
            $('#rowbody').append(`
            <div class="card" style="width: 18rem;margin:2rem" id="${blog._id}">
            <div class="card-body" style="margin-left:3rem">
            <h5 class="card-title">${blog.BlogTitle}</h5>
            <h5 class="card-title2">${blog.BlogCategory}</h5>
            <p class="card-text">${blog.BlogContent}</p>
            <div style="display: flex;">
            <button type="button" class="btn btn-primary" id="deleteblog">Delete</button>
            <button style="margin-left:10px;" type="button" class="btn btn-primary" id="editblog">Edit</button>
            </div>
            </div>
            </div>`)
            $('#showformid').hide();
            $('#rowbody #deleteblog').on('click',deleteblog);
            $('#rowbody #editblog').on('click',editblog);
        }
    });
}

//Working
var idedit=0;
function editblog()
{
    isUpdate=true;
    var title=$(this).closest(".card").find(".card-title").text();
    var content=$(this).closest(".card").find(".card-text").text();
    var category=$(this).closest(".card").find(".card-title2").text();
    idedit=$(this).closest(".card").attr("id");
   
    $('#showformid').show();
    $('#titlearea').val(title);
    $('#contentarea').val(content);
    $('#categoryselect').val(category);

    

}

function updateblog()
{
    $('#showformid').hide();
    var title=$('#titlearea').val();
    var content=$('#contentarea').val();
    var category=$('#categoryselect').find(":selected").text();
    $.ajax({
        url:`https://assign2api55.herokuapp.com/blogs/${idedit}`,
        method:"PUT",
        data:{
            BlogTitle:title,
            BlogContent:content,
            BlogCategory:category
        },
        success:(blog)=>{
            $(`#${blog._id}`).replaceWith(`
            <div class="card" style="width: 18rem;margin:2rem" id="${blog._id}">
            <div class="card-body" style="margin-left:3rem">
            <h5 class="card-title">${blog.BlogTitle}</h5>
            <h5 class="card-title2">${blog.BlogCategory}</h5>
            <p class="card-text">${blog.BlogContent}</p>
            <div style="display: flex;">
            <button type="button" class="btn btn-primary" id="deleteblog">Delete</button>
            <button style="margin-left:10px;" type="button" class="btn btn-primary" id="editblog">Edit</button>
            </div>
            </div>
            </div>`)
            $('#rowbody #deleteblog').on('click',deleteblog);
            $('#rowbody #editblog').on('click',editblog);
        }
    }).then(()=>{
        getallblogs();
    })

  

    $('#rowbody #deleteblog').on('click',deleteblog);
    $('#rowbody #editblog').on('click',editblog); 
    
}

function getallblogs()
{
    $("#rowbody").empty();
    $.ajax({
        url:`https://assign2api55.herokuapp.com/blogs/`,
        method:"GET",
        success:(blogs)=>{
            blogs.forEach(blog=>{
                
                var title=blog.BlogTitle
                var content=blog.BlogContent
                var category=blog.BlogCategory
                var deletedid=blog._id
                $('#rowbody').append(`
                <div class="card" style="width: 18rem;margin:2rem" id=${deletedid}>
                <div class="card-body" style="margin-left:3rem">
                <h5 class="card-title">${title}</h5>
                <h5 class="card-title2">${category}</h5>
                <p class="card-text">${content}</p>

                <div style="display: flex;">
                <button type="button" class="btn btn-primary" id="deleteblog">Delete</button>
                <button style="margin-left:10px;" type="button" class="btn btn-primary" id="editblog">Edit</button>
                </div>
                </div>
                </div>`)
                $('#rowbody #deleteblog').on('click',deleteblog);
                $('#rowbody #editblog').on('click',editblog);
            })
        }
    });
}

function deleteblog()
{
   var deletedid=$(this).closest(".card").attr("id");
 
      $.ajax({
        url:`https://assign2api55.herokuapp.com/blogs/${deletedid}`,
        method:"DELETE",
        success:(blog)=>{
            $(this).closest(".card").remove();
        }
    }); 
}
