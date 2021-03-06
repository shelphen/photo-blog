<?php

namespace Api\V1\Http\Middleware;

use App\Core\Validator\Validator;
use App\Services\Thumbnails\ThumbnailService;
use Illuminate\Http\Request;
use Illuminate\Contracts\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Closure;

/**
 * Class UploadPhotoFile
 * @property Filesystem $fs
 * @property ThumbnailService thumbnailService
 * @package Api\V1\Http\Middleware
 */
class UploadPhotoFile
{
    use Validator;

    /**
     * PhotoFileUploader constructor.
     *
     * @param Filesystem $fs
     * @param ThumbnailService $thumbnailService
     */
    public function __construct(Filesystem $fs, ThumbnailService $thumbnailService)
    {
        $this->fs = $fs;
        $this->thumbnailService = $thumbnailService;
    }

    /**
     * @inheritdoc
     */
    protected function getValidationRules() : array
    {
        return [
            'default' => [
                'file' => [
                    'required',
                    'filled',
                    'file',
                    'image',
                    'mimes:jpeg,png',
                    'min:' . config('main.upload.min-size'),
                    'max:' . config('main.upload.max-size'),
                ],
            ],
        ];
    }

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string|null $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $this->validate($request->all(), 'default');

        $photoPath = $request->file('file')->store(sprintf('%s/%s', config('main.storage.photos'), str_random(10)));

        if ($photoPath === false) {
            throw new FileException("File '{$photoPath}' saving error.");
        }

        $attributes = ['path' => $photoPath, 'relative_url' => $this->fs->url($photoPath)];

        foreach (config('main.photo.thumbnails') as $thumbnail) {
            $thumbnailPath = $this->thumbnailService->createThumbnailFile($photoPath, $thumbnail['size']['width'], $thumbnail['size']['height'], $thumbnail['type']);
            $attributes['thumbnails'][] = $thumbnail['size'] + ['path' => $thumbnailPath, 'relative_url' => $this->fs->url($thumbnailPath)];
        }

        $request->merge($attributes);

        return $next($request);
    }
}
