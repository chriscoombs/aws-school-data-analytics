from pyspark.context import SparkContext
from pyspark.sql import SparkSession
from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue.utils import getResolvedOptions
from pyspark.sql.functions import *
import sys
args = getResolvedOptions(sys.argv,['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc.getOrCreate())
spark = glueContext.spark_session
job = Job(glueContext)
job_name = args['JOB_NAME']
job_instance = args['JOB_RUN_ID']
job.init(args['JOB_NAME'], args)
alunos_df=spark.read.format('csv').options(header='True').load('<YOURBUCKETPATH>/DMS_RAW/PDBADMIN/ALUNOS/')
notas_df=spark.read.format('csv').options(header='True').load('<YOURBUCKETPATH>/DMS_RAW/PDBADMIN/NOTAS/')
professores_df=spark.read.format('csv').options(header='True').load('<YOURBUCKETPATH>/DMS_RAW/PDBADMIN/PROFESSORES/')
disciplinas_df=spark.read.format('csv').options(header='True').load('<YOURBUCKETPATH>/DMS_RAW/PDBADMIN/DISCIPLINAS/')
temp_df=notas_df.join(professores_df,"id_professor","left")
new_df=temp_df.join(alunos_df,'id_aluno','left')
final_df=new_df.join(disciplinas_df,'id_disciplina','left')
final_df.repartition(1).write.format('json').mode('overwrite').save('<YOURBUCKETPATH>/GLUE_ETL/')