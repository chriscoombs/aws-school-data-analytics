( async () => {

  const queryStr = decodeURIComponent(window.location.search);

  if (!queryStr || queryStr.split('=')[1] === '') {
    alert('Missing ID as argument')
    window.location.href = "../index.html";
  }

  userID = queryStr.split('=')[1]


  let jsonData = []

  let userData = {}
  
  await fetch( '../assets/data.json' )
    .then( response => response.json() )
    .then( obj => jsonData = obj )
    .catch( err => console.error( err ) )


  const getData = ( jsondata, tipo_usuario  ) => {
    
    let id_1 = "1", id_2 = "2", id_3 = "3", id_4 = "4", id_5 = "5", id_6 = "6", id_7 = "7";
    let id_turma1 = '3ECA', id_turma2 = '3ECB'
    let id_1t = "2020/1", id_2t = "2020/2", id_3t = "2020/3";

    let studentData = {

      ID_CURSO: '',
      ID_TURMA: '',
      NOME_ALUNO: '',

      ID_TRIMESTRE: {

        [id_1t]: {
          ID_DISCIPLINA: {
            [id_1]: {},
            [id_2]: {},
            [id_3]: {},
            [id_4]: {},
            [id_5]: {},
            [id_6]: {},
            [id_7]: {},
          }
        },

        [id_2t]: {
          ID_DISCIPLINA: {
            [id_1]: {},
            [id_2]: {},
            [id_3]: {},
            [id_4]: {},
            [id_5]: {},
            [id_6]: {},
            [id_7]: {},
          }
        },

        [id_3t]: {
          ID_DISCIPLINA: {
            [id_1]: {},
            [id_2]: {},
            [id_3]: {},
            [id_4]: {},
            [id_5]: {},
            [id_6]: {},
            [id_7]: {},
          }
        },
      },
    }

    let professorData = {
      ID_PROFESSOR: '',
      NOME_PROFESSOR: '',
      ID_CURSO: {
        
        "EC": {
          [id_1]: {  
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },
          [id_2]: {
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },
          [id_3]: {
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },
          [id_4]: {
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },
          [id_5]: {
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },
          [id_6]: {
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },
          [id_7]: {
            [id_turma1]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
            [id_turma2]: {
              NOME_DISCIPLINA: '', 
              NOME_ALUNO: [],
              NOTA_ALUNO: []
            },
          },       
        }  
      },

    }

    if ( tipo_usuario === 'aluno' ) {
      
      jsondata.forEach( ( data ) => {
    
        if ( data['ID_ALUNO'] === userID ) {
    
          studentData[ "ID_CURSO" ] = data[ "ID_CURSO" ]
          studentData[ "ID_TURMA" ] = data[ "ID_TURMA" ]
          studentData[ "NOME_ALUNO" ] = data[ "NOME_ALUNO" ]

          studentData[ 'ID_TRIMESTRE' ][ data[ 'ID_TRIMESTRE' ] ][ "ID_DISCIPLINA" ][ data[ "ID_DISCIPLINA" ] ] =  {
            "ID_NOTA": data[ "ID_NOTA" ],
            "ID_PROFESSOR": data[ "ID_PROFESSOR" ],
            "NOME_DISCIPLINA": data[ "NOME_DISCIPLINA" ],
            "NOME_PROFESSOR": data[ "NOME_PROFESSOR" ],
            "NOTA": data[ "NOTA" ]
          }
        }
          
      })
  
      console.log( studentData )
      return studentData

    }

    if ( tipo_usuario === 'professor' ) {

      jsondata.forEach( ( data ) => {
    
        if ( data['ID_PROFESSOR'] === userID ) {

          // console.log( data )
          professorData[ 'ID_PROFESSOR' ] = data[ 'ID_PROFESSOR' ]
          professorData[ 'NOME_PROFESSOR' ] = data['NOME_PROFESSOR']

          professorData[ 'ID_CURSO' ][ data[ 'ID_CURSO' ] ][ data[ "ID_DISCIPLINA" ]][ data[ 'ID_TURMA' ] ][ 'NOME_DISCIPLINA' ] = data[ 'NOME_DISCIPLINA' ]
          professorData[ 'ID_CURSO' ][ data[ 'ID_CURSO' ] ][ data[ "ID_DISCIPLINA" ] ][ data[ 'ID_TURMA' ] ][ 'NOME_ALUNO' ].push( data[ 'NOME_ALUNO' ] )
          professorData[ 'ID_CURSO' ][ data[ 'ID_CURSO' ] ][ data[ "ID_DISCIPLINA" ] ][ data[ 'ID_TURMA' ] ][ 'NOTA_ALUNO' ].push( parseInt( data[ 'NOTA' ], 10 ) )
          
          id = data[ "ID_DISCIPLINA" ]
        }     
      })


      mainData = {
        ID_PROFESSOR: professorData[ 'ID_PROFESSOR'],
        NOME_PROFESSOR: professorData[ 'ID_PROFESSOR'],
        ID_CURSO: professorData[ 'ID_CURSO' ]['EC'][ id ]
      }
      console.log( mainData )    
      return mainData
    }
  }


// Funcoes dos graficos

  const barGrapth = ( { labels, data, title } ) => {
    
    console.log(data)
    let colors = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#ffc107', '#6f42c1' ];

    let myChart2 = document.getElementById("myChart2").getContext('2d');

    let chart2 = new Chart( myChart2, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '1º Trismestre',
            data: data['2020/1']['subjectGrades'],
            backgroundColor: colors
          },
          {
            label: '2º Trismestre',
            data: data['2020/2']['subjectGrades'],
            backgroundColor: colors
          },
          {
            label: '3º Trismestre',
            data: data['2020/3']['subjectGrades'],
            backgroundColor: colors
          },

      ]
      },
      options: {
        title: {
          text: title,
          display: true
        }
      }
    });

  }

  const pizzaGrapth = ( { labels, data, title } ) => {

    let labels4 = ['Germany', 'France', 'UK', 'Italy', 'Spain', 'Others(23)'];
    let data4 = [83, 67, 66, 61, 47, 187];
    let colors4 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#CFD4D8'];
  
    let myChart4 = document.getElementById("myChart4").getContext('2d');
  
    let chart4 = new Chart(myChart4, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors4
        }]
      },
      options: {
        title: {
          text: title,
          display: true
        }
      }
    });
  }


  const radarGrapth = ( { labels, data, title } ) => {

    let myChart3 = document.getElementById("myChart3").getContext('2d');

    let chart3 = new Chart( myChart3, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
            label: '1º Trismestre',
            fill: true,
            backgroundColor: "rgba(179, 181, 198, 0.2)",
            borderColor: "rgba(179, 181, 198, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(179, 181, 198, 1)",
            data: data[ '2020/1' ]['subjectGrades']
          },
          {
            label: '2º Trismestre',
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            data: data[ '2020/2' ]['subjectGrades']
          },  
          {
            label: '3º Trismestre',
            fill: true,
            backgroundColor: "rgba(13 110 253, 0.2)",
            borderColor: "rgb(13 110 253)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            data: data[ '2020/3' ]['subjectGrades']
          }
        ]
      },
      options: {
        title: {
          text: title,
          display: true
        }
      }
    });

  }


  const lineGrapth = ( { labels, data, title } ) => {

    const myLineChart = document.querySelector("#myChart1").getContext('2d');
    console.log( data )

    let colors1 = ['#49A9EA', '#36CAAB'];

    let chart1 = new Chart(myLineChart, {
      type: 'line',
      data: {
        datasets: [ 
          {
            data: data[ 1 ],
            label: "Banco de Dados",
            borderColor: "#49A9EA",
            fill: false
          },
          {
            data: data[ 2 ],
            label: "Calculo III",
            borderColor: "#36CAAB",
            fill: false
          },
          {
            data: data[ 3 ],
            label: "Cloud Computing",
            borderColor: "#34495E",
            fill: false
          },
          {
            data: data[ 4 ],
            label: "Fisica",
            borderColor: "#B370CF",
            fill: false
          },
          {
            data: data[ 5 ],
            label: "Inteligencia Artificial",
            borderColor: "#AC5353",
            fill: false
          },
          {
            data: data[ 6 ],
            label: "Programacao",
            borderColor: "#ffc107",
            fill: false
          },
          {
            data: data[ 7 ],
            label: "Sistemas Digitais",
            borderColor: "#6f42c1",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: title
        }
      }

    });
  }

  const profBarGrapth = ( { labels, data, title } ) => {
    
    let colors = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#ffc107', '#6f42c1' ];

    let myChart2 = document.getElementById("myChart2").getContext('2d');

    let chart2 = new Chart( myChart2, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Turma A',
            data: data['turmaA'][0],
            backgroundColor: colors
          },
          {
            label: 'Turma B',
            data: data['turmaB'][0],
            backgroundColor: colors
          },

      ]
      },
      options: {
        title: {
          text: title,
          display: true
        }
      }
    });

  }

  const profLineGrapth = ( { labels, data, title } ) => {

    const myLineChart = document.querySelector("#myChart1").getContext('2d');

    let colors1 = ['#49A9EA', '#36CAAB'];

    let chart1 = new Chart(myLineChart, {
      type: 'line',
      data: {
        datasets: [ 
          {
            data: data[ 'turmaA' ],
            label: "Turma 3ECA",
            borderColor: "#49A9EA",
            fill: false
          },
          {
            data: data[ 'turmaB' ],
            label: "Turma 3ECB",
            borderColor: "#36CAAB",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: title
        }
      }

    });
  }



  if ( userID.search( 'p' ) !== -1 ) {

    console.log( 'Gráficos do professor: ' + userID )
    userData = getData( jsonData, 'professor' )

    cursoA = userData['ID_CURSO']['3ECA']['NOTA_ALUNO']
    cursoB = userData['ID_CURSO']['3ECB']['NOTA_ALUNO']

    nomeTurmas = Object.keys( userData['ID_CURSO'] )

    turmaA_avg_grade = cursoA.reduce((total, numero) => total + numero, 0) / cursoA.length
    turmaB_avg_grade = cursoB.reduce((total, numero) => total + numero, 0) / cursoB.length

    barGrapthData = {
      'turmaA': [],
      'turmaB': []
    }

    nomeTrimestres = [ '1º Trimestre', '2º Trimestre', '3º Trimestre' ]

    let chunkArray = (myArray, chunk_size) => {
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];
      
      for (index = 0; index < arrayLength; index += chunk_size) {
          myChunk = myArray.slice(index, index+chunk_size);
          // Do something if you want with the group
          tempArray.push(myChunk);
      }
  
      return tempArray;
  }
    

    notas1Tr_A = chunkArray( cursoA, 10);
    notas1Tr_B = chunkArray( cursoB, 10 );

    barGrapthData[ 'turmaA' ] = notas1Tr_A
    barGrapthData[ 'turmaB' ] = notas1Tr_B

    lineGrapthData = {
      'turmaA': cursoA,
      'turmaB': cursoB
    }

    console.log( barGrapthData )
    
    turmaA_avg_grade = cursoA.reduce((total, numero) => total + numero, 0) / cursoA.length
    turmaB_avg_grade = cursoB.reduce((total, numero) => total + numero, 0) / cursoB.length

    profBarGrapth( { labels: nomeTrimestres , data: barGrapthData, title: 'Desempenho anual médio das turmas 1º trimestre' } )
    pizzaGrapth( { labels: nomeTurmas, data: [ turmaA_avg_grade, turmaB_avg_grade], title: 'Média anual das turmas' } )
    profLineGrapth( { labels: nomeTurmas, data: lineGrapthData, title: 'Rendimento anual das turmas' } )


  } 

  else {

    console.log( 'Gráficos do aluno: ' + userID )
    userData = getData( jsonData, 'aluno' )  

    subjectNames = []
    subjectGrades = []

    average_subjectScore = []
    max_subjectScore = []

    grades_trimestre = {
      'subject_names': [],
      '2020/1': {},
      '2020/2': {},
      '2020/3': {}
    }

    Object.keys( userData['ID_TRIMESTRE'] ).forEach( trimestre => {

      Object.keys( userData['ID_TRIMESTRE'][ trimestre ][ 'ID_DISCIPLINA' ] ).forEach( subject => {

        subjectNames.push( userData['ID_TRIMESTRE'][ trimestre ][ 'ID_DISCIPLINA' ][ subject ][ 'NOME_DISCIPLINA' ] )
        subjectGrades.push( parseInt( userData['ID_TRIMESTRE'][ trimestre ][ 'ID_DISCIPLINA' ][ subject ][ 'NOTA' ], 10 ) )
        
     });

     grades_trimestre[ 'subject_names' ] = subjectNames
     grades_trimestre[ trimestre ] = { 'subjectGrades': subjectGrades }
     
     subjectNames = []
     subjectGrades = []
    
    });

    console.log( grades_trimestre )


    let id_1 = "1", id_2 = "2", id_3 = "3", id_4 = "4", id_5 = "5", id_6 = "6", id_7 = "7";
    anual_grades = {
      [id_1]: [],
      [id_2]: [],
      [id_3]: [],
      [id_4]: [],
      [id_5]: [],
      [id_6]: [],
      [id_7]: [],
    }

    Object.keys( grades_trimestre ).forEach( e => {
      
      if ( e !== 'subject_names' )
        grades_trimestre[ e ]['subjectGrades'].forEach( ( grade, index ) => anual_grades[ index+1 ].push( grade ) )
      
    })

    console.log( anual_grades )
    average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    max = arr => arr.reduce( ( a,b ) => Math.max( a, b ) )

    Object.keys( anual_grades ).forEach( subject => {  
      average_subjectScore.push( average( anual_grades[ subject ] ).toFixed(2) )
      max_subjectScore.push( max( anual_grades[ subject ] ) )
    
    })  

    console.log( average_subjectScore )
    console.log( max_subjectScore )

    barGrapth( { labels: grades_trimestre[ 'subject_names' ], data: grades_trimestre, title: 'Notas trimestrais por matéria' } )

    pizzaGrapth( { labels: grades_trimestre[ 'subject_names' ], data: max_subjectScore, title: 'Melhor rendimento anual por matéria' } )

    radarGrapth( { labels: grades_trimestre[ 'subject_names'], data: grades_trimestre, title: 'Rendimento por trimestre' } )

    lineGrapth( { labels: grades_trimestre[ 'subject_names' ], data: anual_grades, title: 'Evolução das notas ao longo do ano' } ) 

  }


})();
