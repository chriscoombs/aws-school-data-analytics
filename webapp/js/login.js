( () => {

  const searchBtn = document.querySelector( '.searchButton' );

  searchBtn.addEventListener( "click", ( e ) => {

    e.preventDefault();
    let searchValue = document.querySelector( '.searchTerm' );

    if ( searchValue.value !== '' ) {

      console.log( 'ID: ' +  searchValue.value );

      let queryStr = `?name=${searchValue.value}`
      window.location.href = "./html/home.html" + queryStr;

    }


  });

} )();