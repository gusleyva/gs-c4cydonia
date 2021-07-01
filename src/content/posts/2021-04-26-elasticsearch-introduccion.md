---
template: blog-post
title: Introduccion a Elasticsearch
slug: /elasticsearch-introduccion
date: 2021-04-26 11:05
description: ElasticSearch
featuredImage: /assets/2021/04/00-elasticsearch.png
---
A continuación una introducción a Elasticsearch.

## Herramientas a utilizar

- [Docker](https://www.docker.com/)
- Linea de comandos (Command line)
- [Curl](https://curl.se/download.html)

### Instalando Elasticsearch utilizando docker

El siguiente comando va a descargar la "imagen" de Elasticsearch del repositorio de Docker, esto puede tomar unos minutos.

El siguiente comando va a descargar la "imagen" de Elasticsearch del repositorio de Docker, esto puede tomar unos minutos.

```
docker pull <nombre-de-la-imagen>
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.1
```

### Ejecutando Elasticsearch por primera vez

A continuación, le indicamos a Docker que debe ejecutar la imagen descargada dentro del rango de puertos mencionados a través del parámetro "-p"

```
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.1
```

### Probando Elasticsearch

Abre tu navegador (Chrome, Mozilla, etc) y teclea

```
http://localhost:9200/
```

Resultado esperado

![es-up](/assets/2021/04/01_Elasticsearch_browser.png "es-up")

# Trabajando con Elasticsearch

Una vez que tenemos Elasticsearch funcionando es hora de empezar a crear nuestro Indices, generar nuestros archivos de mapeo, ejecutar busquedas simples y un poco mas avanzadas...

## Curl

Otra forma de validar que Elasticsearch esta funcionando es realizando una llamada a los "nodos" de la herramienta

Abre la línea de comandos de tu preferencia y ejecuta:

```
curl -X GET "localhost:9200/_cat/nodes?v&pretty"
O
curl -XGET "localhost:9200/_cluster/stats?pretty"
```

El resultado esperado:

![es-curl](/assets/2021/04/02-Elasticsearch_curl.png "es-curl")

## Indices

Desde la consola o línea de comandos ejecuta el siguiente comando para crear nuestro primer indíce, a continuación explicaremos que es lo que esta haciendo.

```
curl -X PUT "localhost:9200/users?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "full_name_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "asciifolding"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "company_id": {
        "type":  "keyword"
      },
      "user_id": {
        "type":  "keyword"
      },
      "full_name": {
        "type":  "text",
        "analyzer": "full_name_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "status": {
        "type":  "keyword"
      },
      "organizations": {
        "type":  "nested",
        "properties": {
          "org_id": {
            "type": "text"
          },
          "org_admin": {
            "type": "boolean"
          },
          "org_name": {
            "type": "text"
          }
        }
      },
      "last_accessed": {
        "type":  "date"
      }
    }
  }
}
'
```

El resultado esperado:

```
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "users"
}
```

### Settings

- `full_name_analyzer` - Es el nombre de nuestro "[Analyzer](notion://www.notion.so/_wp_link_placeholder)", el cual nos va a ayudar asignando una configuración al campo que designemos; En esta ocasión utilizamos la opción por default "[Standar analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-analyzer.html)", que va a convertir cada palabra en un "token" (consideralo como un elemento en una lista) y esta será "filtrada" (filter) a minusculas (lowercase) y solo carácteres aceptados por el código "ascii" (asciifolding).... En palabras simples, nos ayudará a manejar el problema de palabras con mayúsculas, minúsculas y carácteres especiales, sin esta configuración, Elasticsearch iba a tomar como palabras distintas "juan", "juAN", ju4n", regresando resultados que hicieran una coincidencia exacta de la palabra que se busca.

### Mappings

A continuación mencionaremos algunos tipos de datos que se manejan en Elasticsearch y explicaremos aquellos de interés para nuestra implementación.

- Tipos de datos: keyword, text, date, boolean, nested, etc.
- Keyword: Usado para optimizar la búsqueda y recomendado para identificadores o valores únicos
- Nested: Piensa en ellos como objetos, sub-estructuras que pueden contener multiples valores.
- Nota: Una forma de obtener la configuración del "Indice"

```
curl -XGET http://localhost:9200/users/_mapping?pretty
```

Ejecutalo y válida que la configuración es la misma que nosotros hemos creado manualmente

## Agregando datos

- Registro 1:

```
curl -X PUT "localhost:9200/users/_doc/1?pretty" -H 'Content-Type: application/json' -d'
{
  "company_id": "1001",
  "user_id": "11001",
  "full_name": "Test user1",
  "status": "New",
	"organizations": [
		{
			"org_id": "22001",
			"org_admin": "true",
			"org_name": "org 1"
		}
	],
	"last_accessed": 1603813571757
}
'
```

- Registro 2:

```
curl -X PUT "localhost:9200/users/_doc/2?pretty" -H 'Content-Type: application/json' -d'
{
  "company_id": "1001",
  "user_id": "11002",
  "full_name": "Test uSEr2",
  "status": "Active",
	"organizations": [
		{
			"org_id": "22001",
			"org_admin": "true",
			"org_name": "org 1"
		}
	],
	"last_accessed": 1603813571757
}
'
```

- Registro 3:

```
curl -X PUT "localhost:9200/users/_doc/3?pretty" -H 'Content-Type: application/json' -d'
{
  "company_id": "1001",
  "user_id": "11003",
  "full_name": "Test USER1",
  "status": "Enable",
	"organizations": [
		{
			"org_id": "22001",
			"org_admin": "true",
			"org_name": "org 1"
		}
	],
	"last_accessed": 1603813571757
}
'
```

- Nota: Observa que cada URL tiene un "id" distinto

```

host:port/index_name/doc_type/id
localhost:9200/users/_doc/3?pretty"

```

## Buscando datos

- Obten todos los registros

```

curl -X GET "localhost:9200/users/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_all": {}
    }
}
'

```

- Obten usuarios donde "full_name" = "user1"

```

curl -X GET "localhost:9200/users/_doc/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "term": {
      "full_name": "user1"
    }
  }
}
'

```

- Obten usuarios donde "full_name" contenga "test"

```

curl -X GET "localhost:9200/users/_doc/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "term": {
      "full_name": "test"
    }
  }
}
'

```

- Filtra los usuarios por compañia y obten los usuario por "id"

```

curl -X GET "localhost:9200/users/_doc/_search?pretty" \
-H 'Content-Type: application/json' \
-d '
{
  "query": {
    "bool": {
      "must": {
        "terms"	: {
          "company_id" : [
            "1001"
          ]
        }
      },
      "filter": {
        "term": {
          "user_id": "11002"
        }
      }
    }
  }
}
'

```

- Obten los usuarios por compañia y organización

```

curl -X GET "localhost:9200/users/_search?pretty" \
-H 'Content-Type: application/json' \
-d '
{
  "query": {
    "bool" : {
      "must" : [
        {
          "terms" : {
            "company_id" : [
              "1001"
            ]
          }
        }
      ],
       "filter" : [
	      {
	        "nested" : {
	          "query" : {
	            "bool" : {
	              "must" : [
	                {
	                  "term" : {
	                    "organizations.org_id" : {
	                      "value" : "22001",
	                      "boost" : 1.0
	                    }
	                  }
	                }
	              ]
	            }
	          },
	          "path" : "organizations"
	        }
	      }
	    ]
    }
  }
}
'

```

# Resumen

En este artículo revisamos:

1. Como instalar Elastic search utilizando docker.
2. Crear un índice de Elasticsearch de forma manual.
3. Los tipos de datos de Elasticsearch.
4. Como agregar registros de forma manual.
5. Queries básicos e intermedios.

### Autor

Gustavo Leyva.

[Twitter](https://twitter.com/ovatleyva)

[Github](https://github.com/gusleyva)