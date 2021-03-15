import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Article, { schema } from './model'

const router = new Router()
const { title, content } = schema.tree

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, content }),
  create)

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of articles.
 * @apiSuccess {Object[]} rows List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /articles/:id Retrieve article
 * @apiName RetrieveArticle
 * @apiGroup Article
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, content }),
  update)

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
