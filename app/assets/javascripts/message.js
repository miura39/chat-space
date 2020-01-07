$(function(){ 
  last_message_id = $('.chat-main__message-lists:last').data("message-id");
  console.log(last_message_id);
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__message-lists" data-message-id="${message.id}">
         <div class="chat-main__message-lists">
           <div class="chat-main__message-lists__name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-lists__time">
            ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-lists">
           <p class="chat-main__message-lists__content">
           ${message.content}
           </p>
         </div>
         <img src="${message.image}">
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message-lists" data-message-id="${message.id}">
        <div class="chat-main__message-lists__name">
          ${message.user_name}
          <div class="chat-main__message-lists__name__time">
          ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-lists__message">
         <p class="chat-main__message-lists__message__content"></p>
         ${message.content}
        </div>
      </div>`
     return html;
  };
 };
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')

  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.new_message__form__send').attr('disabled', false);
    })
  });


 
  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-lists:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".new_message__form__send").prop("disabled", false);
        }
      })
      
      .fail(function() {
        alert('error');
      });
    };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


